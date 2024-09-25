# GZWMap CLI

## Table of contents
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [Commands](#commands)
  * [``gen``](#gen)
  * [``check``](#check)
* [Available Prefixes](#available-prefixes)
* [Contributing](#contributing)
* [Changes](#changes)

## Description

[GZWMap CLI](https://github.com/robertarnorsson/gzwmap) is a command-line utility designed to simplify the process of generating unique IDs for various markers and elements within the [gzwmap](https://github.com/robertarnorsson/gzwmap) project. With the ability to create IDs for Tasks, Objectives, Keys, LZs, Locations, POIs, and Items, this tool allows developers to quickly and efficiently generate identifiers with custom lengths and prefixes, ensuring smooth integration into the [gzwmap](https://github.com/robertarnorsson/gzwmap) project. Additionally, it includes a validation tool for checking the uniqueness of IDs across the project files.

## Installation
To install the GZWMap CLI globally on your system, run the following command:
```bash
npm install -g gzwmap-cli
```

## Usage
Once installed, you can use the GZWMap CLI by running the following command in your terminal. If it doesn’t work immediately, restart your terminal session:
```bash
gzwmap-cli <command> <options>
```

## Commands
Below are the available commands for the GZWMap CLI:

### ``gen``
The ``gen`` command generates one or more unique IDs with a chosen prefix. You can specify the number of IDs to generate and their length.

```bash
gzwmap-cli gen [amount] [length] [-p, --prefix <char>]
```
- ``amount``: Number of IDs to generate (default: 1)
- ``length``: Length of the generated IDs (default: 6)
- ``-p, --prefix <char>``: Override the default ID prefix with a custom prefix.

**Example**
```bash
gzwmap-cli gen 3 8 -p C
```
This command will generate 3 IDs, each 8 characters long, with the prefix "C".

---

### ``check``
The ``check`` command scans the current project directory to ensure that all generated IDs are unique. It can also be run with the ``--force`` option to automatically use the current working directory without prompting for confirmation.

```bash
gzwmap-cli check [-f, --force]
```
- ``-f, --force``: Bypasses the confirmation prompt and uses the current working directory.

**Example**
```bash
gzwmap-cli check -f
```
This command will check for duplicate IDs within the current directory, without asking for directory confirmation.

## Available Prefixes

When generating IDs, you can choose from the following predefined prefixes:

    Task
    Objective
    Key
    LZ
    Location
    POI
    Item

## Additional Information
This tool is specifically designed for generating and managing IDs within the [gzwmap](https://github.com/robertarnorsson/gzwmap) project. It is tailored to support the unique data requirements of the project, such as creating Task, Objective, Key, LZ, Location, POI, and Item IDs. As this CLI is built for a specific use case, pull requests or issues suggesting functionality for generating IDs for unrelated projects will not be accepted. Please use the tool as intended to maintain compatibility and consistency within the [gzwmap](https://github.com/robertarnorsson/gzwmap) project.

## Contributing
Contributions are encouraged! If you’d like to help improve the [GZWMap CLI](https://github.com/robertarnorsson/gzwmap-cli), feel free to open an issue or submit a pull request on the GitHub repository. Please ensure your changes are aligned with the project's goals and are well-documented.

## Changes
### 1.0.0 (Initial Release)
Released the first version of the CLI tool.

### 1.0.1 (README Updates)
Enhanced the README with additional details.

### 1.1.0 (ID Generation Limits)
Added limits for the [``gen``](#gen) command to prevent generating more than 1000 IDs at a time to avoid performance issues.

### 1.1.1 (Publish Checklist)
Introduced a checklist for consistent releases and publishes.

### 1.2.0 (Duplicate ID Checker)
Added the [``check``](#check) command to validate that all IDs across the project are unique.

### 1.2.1 (Bugfix Release)
Major fix for the [``check``](#check) command to properly handle and report multiple occurrences of duplicate IDs across different files.
