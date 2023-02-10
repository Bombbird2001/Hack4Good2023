import Express from "express"
import Helmet from "helmet"
import Cors from "cors"
import BodyParser from "body-parser"
import {
    addMsg,
    createAccount, deleteMsg, getMessages,
    getProfile,
    getProfileAll,
    login, MessageObj,
    startConnection,
    updateCanDo,
    updateCannotDo, updateDescription,
    updateDialysisDays,
    updateDisplayName, updateMsgRead,
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

app.get('/getProfileAll', jsonParser, async (_, res) => {
    const userObj = await getProfileAll()
    if (!userObj) {
        res.json({status: "failure", show: true, code: "Failed to retrieve profiles"})
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

app.post('/getMessages', jsonParser, async (req, res) => {
    const username = req.body.username
    const messages = await getMessages(username)
    if (!messages) {
        res.json({status: "failure", show: true, code: "Failed to retrieve messages"})
        res.end()
        return
    }
    res.json({status: "success", data: {username: username, messages: messages}})
    res.end()
})

app.put('/updateMsgRead', jsonParser, async (req, res) => {
    const username = req.body.username
    const msgId = req.body.msgId
    let success = await updateMsgRead(username, msgId)
    if (!success) {
        res.json({status: "failure", show: true, code: "Failed to mark message as read"})
        res.end()
        return
    }
    res.json({status: "success", data: {}})
    res.end()
})

app.post('/sendMsg', jsonParser, async (req, res) => {
    const msgObj: MessageObj = {
        id: -1,
        username: req.body.username,
        title: req.body.msgObj.title,
        email: req.body.msgObj.email,
        message: req.body.msgObj.message,
        opened: false,
        date: req.body.msgObj.date
    }
    let success = await addMsg(msgObj)
    if (!success) {
        res.json({status: "failure", show: true, code: "Failed to send message"})
        res.end()
        return
    }
    res.json({status: "success", data: {}})
    res.end()
})

app.delete('/deleteMsg', jsonParser, async (req, res) => {
    const username = req.body.username
    const id = req.body.id
    let success = await deleteMsg(username, id)
    if (!success) {
        res.json({status: "failure", show: true, code: "Failed to delete message"})
        res.end()
        return
    }
    res.json({status: "success", data: {}})
    res.end()
})

// Start connection to MySQL database before listening
startConnection().then(() => {
    app.listen(4149)
})