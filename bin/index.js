#! /usr/bin/env node

import { program } from "commander";
import figlet from "figlet";
import chalk from "chalk";
import inquirer from "inquirer";
import ora from "ora";

import { generateTaskId } from "../src/commands/gen/gen_task.js";
import { generateObjectiveId } from "../src/commands/gen/gen_objective.js";
import { generateKeyId } from "../src/commands/gen/gen_key.js";
import { generateLZId } from "../src/commands/gen/gen_lz.js";
import { generateLocationId } from "../src/commands/gen/gen_location.js";
import { generatePOIId } from "../src/commands/gen/gen_poi.js";
import { generateItemId } from "../src/commands/gen/gen_item.js";
import { generateCustomId } from "../src/commands/gen/gen_custom.js";
import { checkAllFiles } from "../src/commands/check/check_files.js";

program.version("1.2.1").description("GZWMap CLI Tool");

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
    chalk.bold.yellow(figlet.textSync("GZWMAP-CLI", { horizontalLayout: "full" }))
  );

  console.log(chalk.blueBright(program.helpInformation()));
  console.log(chalk.bgGray(`Example: ${chalk.bgBlack("gzwmap-cli gen 3")}`));
});

program.command('gen')
.description('Generates one or multiple IDs with a selected prefix')
.argument('[integer]', 'amount of IDs to generate', 1)
.argument('[integer]', 'length of the ID', 6)
.option('-p, --prefix <char>', 'overwrite the current ID prefix', undefined)
.action(async (amount, length, options) => {
  if (amount > 1000) {
    console.log(
      chalk.bgRed.white.bold(`Error: Can't create ${amount} IDs! Max 1000 IDs at a time`)
    );
    program.error("");
  } else if (amount < 1) {
    console.log(
      chalk.bgRed.white.bold(`Error: Can't create ${amount} IDs! Minimum 1 ID required`)
    );
    program.error("");
  }

  let generatedIds = [];

  if (options.prefix) {
    generatedIds = generateCustomId(options.prefix, amount, length);
  } else {
    const { selectedPrefix } = await inquirer.prompt([
      {
        type: "list",
        name: "selectedPrefix",
        message: chalk.green('Choose an ID prefix to generate:'),
        choices: Object.keys(prefixes),
      },
    ]);

    const prefixFunc = prefixes[selectedPrefix].function;
    if (prefixFunc) {
      generatedIds = prefixFunc(amount, length);
    } else {
      console.error(chalk.bgRed.white.bold("Invalid selection"));
      return;
    }
  }

  console.log(chalk.green.bold(`\nGenerated ${amount} ID(s):\n`));
  generatedIds.forEach((id) => {
    console.log(`${chalk.cyanBright(` - `)} ${chalk.yellow(id)}`);
  });
});

program.command('check')
.description('Check that every id in the current project is unique.')
.option('-f, --force', 'force to use current working directory', false)
.action(async (options) => {
  const currentDir = process.cwd();

  const spinner = ora(chalk.blue('Checking for duplicate IDs...'));

  try {
    if (!options.force) {
      const { acceptDir } = await inquirer.prompt([
        {
          type: "confirm",
          name: "acceptDir",
          message: chalk.magenta(`Is this the correct directory? -> ${chalk.bold(currentDir)}`)
        }
      ]);
      spinner.start();

      if (acceptDir) {
        const duplicates = await checkAllFiles(currentDir, {
          extensions: ['js', 'ts'],
          excludeDirs: ['node_modules', '.next']
        });
        spinner.succeed(chalk.green('ID check complete'));

        if (duplicates.length > 0) {
          console.log(chalk.red.bold(`Found ${duplicates.length} duplicate ID(s):`));
          duplicates.forEach(({ id, occurrences }) => {
            console.log(chalk.redBright(`Duplicate ID: ${chalk.bold(id)} found in:`));
            occurrences.forEach(({ filePath, lineNumber }) => {
              console.log(chalk.yellow(`  - ${filePath}:${lineNumber}`));
            });
          });
        } else {
          console.log(chalk.greenBright("No duplicate IDs found."));
        }
      } else {
        spinner.fail(chalk.red('Directory check canceled.'));
      }
    } else {
      // Forcing the check without the prompt
      const duplicates = await checkAllFiles(currentDir, {
        extensions: ['js', 'ts'],
        excludeDirs: ['node_modules', '.next']
      });
      spinner.succeed(chalk.green('ID check complete'));

      if (duplicates.length > 0) {
        console.log(chalk.red.bold(`Found ${duplicates.length} duplicate ID(s):`));
        duplicates.forEach(({ id, occurrences }) => {
          console.log(chalk.redBright(`Duplicate ID: ${chalk.bold(id)} found ${occurrences.length} times in:`));
          occurrences.forEach(({ filePath, lineNumber }) => {
            console.log(chalk.yellow(`  - ${filePath}:${lineNumber}`));
          });
        });
      } else {
        console.log(chalk.greenBright("No duplicate IDs found."));
      }
    }
  } catch (error) {
    spinner.fail(chalk.redBright('An error occurred during the check.'));
    console.error(chalk.red(error));
  }
});

program.parse(process.argv);
