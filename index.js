#!/usr/bin/env node

const fs = require("fs");
const chalk = require("chalk");
const path = require("path");

const lstat = fs.promises.lstat;

const targetDir = process.argv[2] || process.cwd();
fs.readdir(targetDir, async (err, fileNames) => {
  try {
    if (err) {
      throw new Error(err);
    }

    const statPromises = fileNames.map((fileName) => {
      return lstat(path.join(targetDir, fileName));
    });

    const allStats = await Promise.all(statPromises);
    for (let stats of allStats) {
      const index = allStats.indexOf(stats);
      if (stats.isFile()) {
        console.log(chalk.blue(fileNames[index]));
      } else {
        console.log(chalk.bold.green(fileNames[index]));
      }
    }
  } catch (er) {
    console.log(err);
  }
});
