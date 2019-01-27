#!/usr/bin/env node

const main = require("./index.js");

const [, , ...args] = process.argv;
const [flag, value] = args;
const params = {};

if (flag === "-c" || flag === "--config") {
  params.config = value;
}

main(params)
  .then(() => {
    process.exit(0);
  })
  .catch(error => {
    process.stderr.write(error.message + "\n");
    process.exit(1);
  });
