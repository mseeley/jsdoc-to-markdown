const path = require("path");
const cosmiconfig = require("cosmiconfig");
const execa = require("execa");
const fs = require("fs-extra");
const glob = require("glob-promise");
const ora = require("ora");
const physicalCpuCount = require("physical-cpu-count");
const PQueue = require("p-queue");

module.exports = async function main(params) {
  const bin = "ms-jsdoc2md";
  const interstitial = "Working...";
  const start = Date.now();
  const spinner = ora();
  const explorer = cosmiconfig(bin);

  spinner.start(interstitial);

  const found = params.config
    ? await explorer.load(params.config).catch(() => Promise.resolve(null))
    : await explorer.search();

  if (found === null) {
    spinner.info("No configuration file found");
    return;
  }

  const { config } = found;

  const inputFileExtension = config.inputFileExtension || ".js";

  const outputDirectory = path.isAbsolute(config.outputDirectory)
    ? config.outputDirectory
    : path.resolve(process.cwd(), config.outputDirectory);

  const maxConcurrency =
    config.concurrency > 0
      ? Math.min(physicalCpuCount, config.concurrency)
      : physicalCpuCount;

  const verbose = (...args) =>
    Boolean(config.verbose) && spinner.info(...args).start(interstitial);

  verbose(`${bin}: v${require("../package.json").version}`);
  verbose(`Configuration: ${JSON.stringify(found, null, 2)}`);

  const inputFiles = await glob(config.inputPattern);

  if (!inputFiles.length) {
    spinner.info("No input files found");
    return;
  }

  const existingFiles = await glob(path.join(outputDirectory, "*.md"));

  if (existingFiles.length) {
    await Promise.all(
      existingFiles.map(file => {
        verbose(`Removing: ${file}`);
        return fs.unlink(file);
      })
    );
  }

  const parts = ["node_modules", ".bin", "jsdoc2md"];

  const executable = path.resolve(process.cwd(), ...parts);

  const transforms = inputFiles.map((file, i) => () => {
    const basename = path.basename(file, inputFileExtension);
    const output = path.resolve(outputDirectory, `${basename}.md`);

    spinner.text = `Working ${i + 1} of ${inputFiles.length}...`;

    return execa(executable, [file]).then(result => {
      const hasDocs = Boolean(result.stdout.trim().length);

      verbose(`${hasDocs ? "Creating" : "Skipping"}: ${output}`);

      return hasDocs
        ? fs
            .mkdirp(outputDirectory)
            .then(() => fs.writeFile(output, result.stdout))
        : Promise.resolve();
    });
  });

  return new PQueue({ concurrency: maxConcurrency })
    .addAll(transforms)
    .then(() => {
      spinner.succeed(`Complete: ${Date.now() - start}ms`);
    });
};
