import Express from "express"
import Helmet from "helmet"
import Cors from "cors"
import BodyParser from "body-parser"
import {login, startConnection} from "./db_connection.js"

const app = Express()
app.use(Helmet())
app.use(Cors())
const jsonParser = BodyParser.json()

// Endpoint for logging in with only username
app.post('/login', jsonParser, async (req, res) => {
    const username = req.body.username
    let displayName = await login(username)
    if (!displayName) {
        res.json({status: "failure", show: true, code: "Invalid username"})
        res.end()
        return
    }
    res.json({status: "success", data: {username: username, displayName: displayName}})
    res.end()
})

// Start connection to MySQL database before listening
startConnection().then(() => {
    app.listen(4149)
})