const checkExtension = (filename) => {
  const EXTENSIONS = ["js", "html", "css", "txt", "json"];

  const filenameArr = filename.split(".");
  const extension = filenameArr[filenameArr.length - 1];

  const result = EXTENSIONS.includes(extension);
  return {
    result,
    extension,
  };
};

module.exports = checkExtension;
