This is a package created for personal use. It wraps the [`jsdoc-to-markdown`](https://www.npmjs.com/package/jsdoc-to-markdown)
package with platform-agnostic batch handling and concurrency.

The package is written in a platform agnostic way yet has only been tested on
macOS. Testing feedback is welcome.

Simplifying assumptions:

- There should be a reusable external configuration file.
- The name of the JavaScript file becomes the name of the Markdown file.
- Each JavaScript file has a single semantic purpose.
- Vanilla Markdown output is good enough.

## Installation

```
npm install -D mseeley@jsdoc-to-markdown
```

## Configuration

You can use different ways to configure it:

- See [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) for more
  details on what formats are supported.
- Or, pass a configuration file using the `--config` or `-c` flag

Example `ms-jsdoc2md.config.js`:

```
module.exports = {
  // These are the files from which to extract JSDoc comments. This is a glob
  // expression parsed by https://www.npmjs.com/package/glob-promise. The
  // pattern below will examine all JavaScript files in the `lib/` directory
  // which do not include `.spec` in their filename.
  inputPattern: "lib/**/!(*.spec).js",

  // The directory to store the generated markdown docs. It can be an absolute
  // path or resolve relative to `process.cwd()`.
  outputDirectory: "docs/",

  // Optional, maximum number of threads to spawn. Defaults to the number of
  // physical CPUs detected.
  concurrency: Number,

  // Optional, the extension of the files parsed for JSDoc comments. Defaults to
  // ".js".
  inputFileExtension: String,

  // Optional, verbose CLI output. Defaults to false.
  verbose: Boolean
};
```

## Usage

The package intentionally fails immediately when an error is encountered. The
package doesn't expose an API; best to use it as an NPM script:

Add the script to your `package.json`.

```
"scripts": {
  "doc": "ms-jsdoc2md"
}
```

Invoke it from the command line:

```
npm run doc
```

## Contributing

Contributions are welcome. Please see ensure that your code and commit message
pass linting requirements. See the `scripts` member of this repo's
`package.json` and `husky.config.js` for more information.
