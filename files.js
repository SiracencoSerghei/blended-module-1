const fs = require("fs").promises;
const path = require("path");
const chalk = require("chalk");
const dataValidator = require("./helpers/dataValidator");
const checkExtension = require("./helpers/checkExtension");

const createFile = async (filename, content) => {
  const file = {
    filename,
    content,
  };

  const { error } = dataValidator(file);

  if (error) {
    console.log(
      chalk.red(`Please specify ${error.details[0].path[0]} parameter `)
    );
    return;
  }

  const { result, extension } = checkExtension(filename);
  if (!result) {
    console.log(
      chalk.red(`this application doesn't support ${extension} extension`)
    );
    return;
  }

  const filePath = path.join(__dirname, "files", filename);
  try {
    await fs.writeFile(filePath, content, "utf-8");
    console.log(chalk.green("File was created successfully"));
  } catch (error) {
    console.log(error);
  }
};

const getFiles = async () => {
  
 const directory = await fs.readdir(path.join(__dirname, "files") )
 if(directory.length === 0) {
  console.log(chalk.red('Directory is EMPTY'))
  return
 }
 console.log('directory', directory)
}

const getInfo = async (filename) => {
  const directory = await fs.readdir(path.join(__dirname, "files") )

const isFile = directory.find(item => item === filename)
 if(  !isFile ) {
  console.log(chalk.red(`${filename} not exist in directory`))
  return
 } 
const fileValues = await fs.readFile(path.join(__dirname, "files", filename), "utf-8")

const extension = path.extname(filename);
const nameFile = path.basename(filename, extension);

const fileObj = {
  name: nameFile,
  extension: extension.slice(1),
  content: fileValues,
}
console.log('fileObj', fileObj)
}

module.exports = { createFile, getFiles, getInfo };
