#! /usr/bin/env node

import { program } from "commander";
import figlet from "figlet";
import chalk from "chalk";
import inquirer from "inquirer";

import { generateTaskId } from "../src/commands/gen_task.js";
import { generateObjectiveId } from "../src/commands/gen_objective.js";
import { generateKeyId } from "../src/commands/gen_key.js";
import { generateLZId } from "../src/commands/gen_lz.js";
import { generateLocationId } from "../src/commands/gen_location.js";
import { generatePOIId } from "../src/commands/gen_poi.js";
import { generateItemId } from "../src/commands/gen_item.js";
import { generateCustomId } from "../src/commands/gen_custom.js";

program.version("1.0.1").description("GZWMap CLI Tool");

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

        console.log('\n');
        console.log(id.join('\n'));
      } else {
        console.error("Invalid selection");
      }
    });
  }
});

program.parse(process.argv);