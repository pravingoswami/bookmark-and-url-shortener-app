const express = require('express')
const setupDB = require('./config/database')

const router = require('./config/router')


setupDB()

const app = express()

app.use(express.json())


app.use('/', router)


const port = 3030
app.listen(port, () => {
    console.log("server Listening on", port)
})