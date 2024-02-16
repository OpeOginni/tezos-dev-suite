#!/usr/bin/env node

import inquirer from "inquirer"
import chalk from 'chalk';

import * as fs from 'fs'
import path, { dirname } from 'path';
import { fileURLToPath } from "url"
import createDirectoryContents from "./createDirectoryContents.js"

const CURR_DIR = process.cwd()

// dirname is not available in ES6 modules
const __dirname = dirname(fileURLToPath(import.meta.url));

const PROJECT_CHOICED = fs.readdirSync(path.join(__dirname, '..', 'templates'))

const PROMPTS = [
    {
        name: 'project-choice',
        type: 'list',
        message: 'What project template would you like to generate?',
        choices: PROJECT_CHOICED
    },
    {
        name: 'project-name',
        type: 'input',
        message: 'Project name:',
        validate: function (input: string) {
            if (/^[A-Za-z0-9\-_#]+$/.test(input)) return true;
            else
                return 'Project name may only include letters, numbers, underscores and hashes.';
        },
    },
]

inquirer.prompt(PROMPTS).then(answers => {

    const projectChoice = answers['project-choice'];
    const projectName = answers['project-name'];
    const templatePath = path.join(__dirname, '..', `templates/${projectChoice}`);

    fs.mkdirSync(`${CURR_DIR}/${projectName}`);

    createDirectoryContents(templatePath, projectName);
})