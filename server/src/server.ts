import Express from "express"
import Helmet from "helmet"
import Cors from "cors"
import BodyParser from "body-parser"
import {
    createAccount,
    getProfile,
    login,
    startConnection,
    updateCanDo,
    updateCannotDo, updateDescription,
    updateDialysisDays,
    updateDisplayName,
    updateSkills
} from "./db_connection.js"

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

// Endpoint for creating account
app.post('/createAccount', jsonParser, async (req, res) => {
    const username = req.body.username
    const displayName = req.body.displayName
    let success = await createAccount(username, displayName)
    if (!success) {
        res.json({status: "failure", show: true, code: "Username already in use"})
        res.end()
        return
    }
    res.json({status: "success", data: {username: username, displayName: displayName}})
    res.end()
})

app.post('/getProfile', jsonParser, async (req, res) => {
    const username = req.body.username
    const userObj = await getProfile(username)
    if (!userObj) {
        res.json({status: "failure", show: true, code: "Failed to retrieve user profile"})
        res.end()
        return
    }
    res.json({status: "success", data: userObj})
    res.end()
})

app.put('/updateDisplayName', jsonParser, async (req, res) => {
    const username = req.body.username
    const displayName = req.body.newDisplayName
    const success = await updateDisplayName(username, displayName)
    if (!success) {
        res.json({status: "failure", show: true, code: "Failed to update display name"})
        res.end()
        return
    }
    res.json({status: "success", data: {username: username, displayName: displayName}})
    res.end()
})

app.put('/updateDescription', jsonParser, async (req, res) => {
    const username = req.body.username
    const description = req.body.description
    const success = await updateDescription(username, description)
    if (!success) {
        res.json({status: "failure", show: true, code: "Failed to update description"})
        res.end()
        return
    }
    res.json({status: "success", data: {username: username, description: description}})
    res.end()
})

app.put('/updateSkills', jsonParser, async (req, res) => {
    const username = req.body.username
    const skills = req.body.skills
    const success = await updateSkills(username, skills)
    if (!success) {
        res.json({status: "failure", show: true, code: "Failed to update skills"})
        res.end()
        return
    }
    res.json({status: "success", data: {username: username, skills: skills}})
    res.end()
})

app.put('/updateCanDo', jsonParser, async (req, res) => {
    const username = req.body.username
    const canDo = req.body.canDo
    const success = await updateCanDo(username, canDo)
    if (!success) {
        res.json({status: "failure", show: true, code: "Failed to update can do"})
        res.end()
        return
    }
    res.json({status: "success", data: {username: username, canDo: canDo}})
    res.end()
})

app.put('/updateCannotDo', jsonParser, async (req, res) => {
    const username = req.body.username
    const cannotDo = req.body.cannotDo
    const success = await updateCannotDo(username, cannotDo)
    if (!success) {
        res.json({status: "failure", show: true, code: "Failed to update cannot do"})
        res.end()
        return
    }
    res.json({status: "success", data: {username: username, cannotDo: cannotDo}})
    res.end()
})

app.put('/updateDialysisDays', jsonParser, async (req, res) => {
    const username = req.body.username
    const dialysisDays = req.body.dialysisDays
    const success = await updateDialysisDays(username, dialysisDays)
    if (!success) {
        res.json({status: "failure", show: true, code: "Failed to update cannot do"})
        res.end()
        return
    }
    res.json({status: "success", data: {username: username, dialysisDays: dialysisDays}})
    res.end()
})

// Start connection to MySQL database before listening
startConnection().then(() => {
    app.listen(4149)
})