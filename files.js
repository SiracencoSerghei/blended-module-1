const fs = require("fs").promises;
const path = require("path");
const chalk = require("chalk");
const dataValidator = require("./helpers/dataValidator");
const checkExtension = require("./helpers/checkExtension");

const createFile = async (req, res, next) => {
  try {
    
  const { error } = dataValidator(req.body);
 const {filename, content} = req.body
  if (error) {
    res.status(400).json({message: `Please specify ${error.details[0].path[0]} parameter `})
    return 
  }

  const { result, extension } = checkExtension(filename);
  if (!result) {
    res.status(400).json({message: `this application doesn't support ${extension} extension`})
    return;
  }

  const filePath = path.join(__dirname, "files", filename);
    await fs.writeFile(filePath, content, "utf-8");
    res.status(201).json({message: "File was created successfully"})

  } catch (error) {
    console.log(error)
    res.sendStatus(500)
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
