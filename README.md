# GZWMap CLI

## Table of contents
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [Commands](#commands)
  * [gen](#gen)
* [Available Prefixes](#available-prefixes)
* [Additional Information](#additional-information)
* [Contributing](#contributing)
* [Changes](#changes)

## Description

GZWMap CLI is a powerful command-line tool designed to streamline the creation of unique identifiers for markers in GZWMap. Quickly and efficiently generate a variety of IDs, including Task, Objective, Key, LZ, Location, POI, and Item identifiers, with customizable length and prefix options.

## Installation
Run this command to install the cli tool globaly on your computer
```bash
npm install -g gzwmap-cli
```

## Usage
Run this command to run the cli tool (restart your terminal if it does'nt work)
```bash
gzwmap-cli <command> <options>
```

## Commands
List of all available commands

### ``gen``
Generates one or multiple IDs with a selected prefix.
```bash
gzwmap-cli gen [amount] [length] [-p, --prefix <char>]
```
- ``amount``- Number of IDs to generate (default: 1)
- ``length``- Length of the generated IDs (default: 6)
- ``-p, --prefix <char>``- Overwrites the current ID prefix

**Example**
```bash
gzwmap-cli gen 3 8 -p C
```
This command will generate 3 IDs with the prefix "C" and a length of 8 characters.

## Additional Information
- The tool uses inquirer to prompt for user input when a prefix is not specified.
- The generated IDs are random strings of characters.
- The tool is under active development and may change in the future.

## Contributing
Contributions are welcome! Please open an issue or pull request on the GitHub repository.

## Changes
### 1.0.0 (First version)
The first version of the CLI tool

### 1.0.1 (README changes)
Updated the README to be more informative

### 1.1.0 (Added amount limits)
Added amount limits to stop program from crashing

### 1.1.1 (Added a publish checklist)
Added a publish checklist to get consistent publishes