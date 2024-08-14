#! /usr/bin/env node

import { program } from "commander";
import figlet from "figlet";
import chalk from "chalk";
import inquirer from "inquirer";

import fs from 'node:fs';

import { generateTaskId } from "../src/commands/gen/gen_task.js";
import { generateObjectiveId } from "../src/commands/gen/gen_objective.js";
import { generateKeyId } from "../src/commands/gen/gen_key.js";
import { generateLZId } from "../src/commands/gen/gen_lz.js";
import { generateLocationId } from "../src/commands/gen/gen_location.js";
import { generatePOIId } from "../src/commands/gen/gen_poi.js";
import { generateItemId } from "../src/commands/gen/gen_item.js";
import { generateCustomId } from "../src/commands/gen/gen_custom.js";
import path from "node:path";
import { checkAllFiles } from "../src/commands/check/check_files.js";

program.version("1.1.1").description("GZWMap CLI Tool");

const prefixes = {
  "Task":      {id: 1, function: generateTaskId},
  "Objective": {id: 2, function: generateObjectiveId},
  "Key":       {id: 3, function: generateKeyId},
  "LZ":        {id: 4, function: generateLZId},
  "Location":  {id: 5, function: generateLocationId},
  "POI":       {id: 6, function: generatePOIId},
  "Item":      {id: 7, function: generateItemId},
};

program.action(() => {
  console.log(
    chalk.yellow(figlet.textSync("GZWMAP-CLI", { horizontalLayout: "full" }))
  );

  console.log(program.helpInformation());
  console.log(`Example: ${chalk.bgBlack("gzwmap-cli gen 3")}`)
})

program.command('gen')
.description('Generates one or mulitple ids with a selected prefix')
.argument('[integer]', 'amount of ids to generate', 1)
.argument('[integer]', 'length of the id', 6)
.option('-p, --prefix <char>', 'overwrites the current id prefix', undefined)
.action((amount, length, options) => {
  console.log(
    chalk.yellow(figlet.textSync("GZWMAP-CLI", { horizontalLayout: "full" }))
  );

  if (amount > 1000) {
    console.log(
      chalk.redBright(`Can't create ${amount} IDs! Max 1000 IDs at a time`)
    );

    program.error("")
  } else if (amount < 1) {
    console.log(
      chalk.redBright(`Can't create ${amount} IDs! Min 1 ID`)
    );

    program.error("")
  };

  if (options.prefix) {
    const id = generateCustomId(options.prefix, amount, length);

    console.log(id.join('\n'));
  } else {
    inquirer.prompt([
      {
        type: "list",
        name: "selectedPrefix",
        message: "Choose an id prefix to generate:",
        choices: Object.keys(prefixes),
      },
    ])
    .then((prefix) => {
      const selectedPrefix = prefixes[prefix.selectedPrefix];

      const prefixFunc = selectedPrefix.function;

      if (prefixFunc) {
        const id = prefixFunc(amount, length);

        console.log(id.join('\n'));
      } else {
        console.error("Invalid selection");
      }
    });
  }
});

program.command('check')
.description('Check that every id in the current project is unique.')
.option('-f, --force', 'force to use current working directory', false)
.action(async (options) => {
  const currentDir = process.cwd();

  if (!options.force) {
    inquirer.prompt([
      {
        type: "confirm",
        name: "acceptDir",
        message: `Is this the correct directory? -> ${currentDir}`
      }
    ])
    .then(async (anwser) => {
      if (anwser.acceptDir == true) {
        const ids = await checkAllFiles(currentDir);
        return ids;
      }
    })
  } else {
    const ids = await checkAllFiles(currentDir);
    return ids;
  }
})

program.parse(process.argv);