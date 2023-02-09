import Express from "express"
import {createTable} from "./db_connection.js"

const app = Express()

app.get('/', (err, res) => {
    res.status(200)
    res.send("Hello Shiba")
    createTable()
    res.end()
})

app.listen(4149)