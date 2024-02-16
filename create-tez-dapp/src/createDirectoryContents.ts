import * as fs from 'fs'
const CURR_DIR = process.cwd()

export default function createDirectoryContents(templatePath: string, newProjectPath: string) {
    const filesToCreate = fs.readdirSync(templatePath)

    filesToCreate.forEach(file => {
        const origFilePath = `${templatePath}/${file}`

        const stats = fs.statSync(origFilePath)

        if (stats.isFile()) {
            const contents = fs.readFileSync(origFilePath, 'utf8')

            if (file === '_gitignore') file = '.gitignore';

            const writePath = `${CURR_DIR}/${newProjectPath}/${file}`
            fs.writeFileSync(writePath, contents, 'utf8')
        } else if (stats.isDirectory()) {
            fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`)


            //recursive call

            createDirectoryContents(
                `${templatePath}/${file}`,
                `${newProjectPath}/${file}`
            )
        }
    })
}