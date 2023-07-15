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
      chalk.red(`this application doesn't support ${extension} extention`)
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

module.exports = { createFile };
