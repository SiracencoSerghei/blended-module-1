const { Router } = require("express")
const { createFile, getFiles, getInfo } = require("./files")

const filesRouter = Router()

filesRouter.post("/",createFile)





module.exports = filesRouter