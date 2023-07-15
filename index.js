const argv = require("yargs").argv;
const {createFile, getFiles, getInfo } = require("./files");

function invokeAction({ action,filename, content }) {
  switch (action) {
    case "create":
        createFile(filename,content);
      break;

    case "getFiles":
      getFiles();
      break;

    case "getInfo":
      getInfo(filename)
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
