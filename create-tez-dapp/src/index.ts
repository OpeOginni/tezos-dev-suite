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

const PROJECT_CHOICED = fs.readdirSync(path.join(__dirname, '..', 'templates')).map(project => project.replace(/-/g, ' + ').replace(/_/g, ' '))

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
            if (/^(?:@[a-zA-Z\d\-*~][a-zA-Z\d\-*._~]*\/)?[a-zA-Z\d\-~][a-zA-Z\d\-._~]*$/.test(input)) return true;
            else
                return 'Project name may only include letters, numbers, underscores and hashes.';
        },
    },
]


inquirer.prompt(PROMPTS).then(answers => {

    const projectChoice = answers['project-choice'].replaceAll(' + ', '-').replaceAll(' ', '_').toLowerCase();
    const projectName = answers['project-name'].trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/^[._]/, '')
        .replace(/[^a-z\d\-~]+/g, '-');
    const templatePath = path.join(__dirname, '..', `templates/${projectChoice}`);

    console.log(`creating a new Tezos Dapp in ${chalk.green(`${CURR_DIR}/${projectName}`)}...`)
    fs.mkdirSync(`${CURR_DIR}/${projectName}`);

    createDirectoryContents(templatePath, projectName);
    console.log("\n\n")

    console.log("Done. Now run:\n")

    console.log(`cd ${projectName}`)
    console.log("npm install")
    console.log("npm run dev")
})