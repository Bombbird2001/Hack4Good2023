import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import {getProfile} from '../../requests/ProfileRequests'
import './Profile.css'
import TextList from "../containers/TextList"
import {useEffect, useState} from "react"
import {Button, Col, Modal} from "react-bootstrap"
import DialysisDays from "../containers/DialysisDays"
import {redirect, useParams} from "react-router"
import MessageSend from "../containers/MessageSend"
import {sendMsg} from "../../requests/MessageRequests"

const PublicProfile = () => {
    const [displayName, setDisplayName] = useState("")
    const [description, setDescription] = useState("")
    const [skills, setSkills] = useState([] as string[])
    const [canDo, setCanDo] = useState([] as string[])
    const [cannotDo, setCannotDo] = useState([] as string[])
    const [dialysisDays, setDialysisDays] = useState([false, false, false, false, false, false, false])
    const [showSendMsg, setShowSendMsg] = useState(false)
    const [showSendMsgSuccess, setShowSendMsgSuccess] = useState(false)

    const splat = useParams()
    const username = splat["*"]

    useEffect(() => {
        if (username)
            getProfile(username, () => {
                console.log("Not found")
                redirect("/notFound")
            }, (userObj) => {
                if (userObj.displayName) setDisplayName(userObj.displayName)
                if (userObj.description) setDescription(userObj.description)
                if (userObj.skills) setSkills(userObj.skills)
                if (userObj.canDo) setCanDo(userObj.canDo)
                if (userObj.cannotDo) setCannotDo(userObj.cannotDo)
                if (userObj.dialysisDays) setDialysisDays(userObj.dialysisDays)
            })
    }, [splat])

    return (
        <>
            <Container fluid className="container-offset-default">
                <Row>
                    <h1 className="pad-vert">{displayName}</h1>
                    <h5 className="username">@{username}</h5>
                </Row>
                <Button style={{marginTop: "20px"}} variant="dark" onClick={() => setShowSendMsg(true)}>Send message</Button>
                <Row style={{marginTop: "20px"}}>
                    <Col xs={12} md={6}>
                        <p className="text-spacing multiline-text">{description}</p>
                    </Col>
                </Row>
                <Row style={{marginTop: "20px"}}>
                    <Col xs={12} md={6}>
                        <h2>Skills</h2>
                        <TextList items={skills}/>
                    </Col>
                </Row>
                <Row style={{marginTop: "20px"}}>
                    <Col xs={12} md={6}>
                        <h2>Strengths</h2>
                        <TextList items={canDo}/>
                    </Col>
                    <Col xs={12} md={6}>
                        <h2>Weaknesses</h2>
                        <TextList items={cannotDo}/>
                    </Col>
                </Row>
                <Row style={{marginTop: "20px"}}>
                    <Col xs={12} md={6}>
                        <h2>My dialysis days</h2>
                        <DialysisDays days={dialysisDays}/>
                    </Col>
                </Row>
            </Container>
            <MessageSend displayName={displayName} show={showSendMsg} onSend={(msgObj) => {
                if (username)
                    sendMsg(username, msgObj, () => {}, () => {
                        setShowSendMsg(false)
                        setShowSendMsgSuccess(true)
                    })
            }} onHide={() => setShowSendMsg(false)}/>
            <Modal show={showSendMsgSuccess}>
                <Modal.Header>
                    <Modal.Title>Message sent</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="justify-content-center">Message has been sent successfully</Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowSendMsgSuccess(false)}>Ok</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default PublicProfile