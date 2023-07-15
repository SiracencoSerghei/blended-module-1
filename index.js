const express = require("express")
const morgan = require("morgan")
const filesRouter = require("./router")


const app = express()

app.use(morgan("tiny"))

app.use(express.json())

app.use('/api/files', filesRouter)

app.listen(3000, ()=> console.log('Server is running'))