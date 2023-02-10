import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import {getProfile} from '../../requests/ProfileRequests'
import './Profile.css'
import TextList from "../containers/TextList"
import {useEffect, useState} from "react"
import {Col} from "react-bootstrap"
import DialysisDays from "../containers/DialysisDays"
import {useParams} from "react-router"

const PublicProfile = () => {
    const [displayName, setDisplayName] = useState("")
    const [description, setDescription] = useState("")
    const [skills, setSkills] = useState([] as string[])
    const [canDo, setCanDo] = useState([] as string[])
    const [cannotDo, setCannotDo] = useState([] as string[])
    const [dialysisDays, setDialysisDays] = useState([false, false, false, false, false, false, false])

    const splat = useParams()
    const username = splat["*"]

    useEffect(() => {
        if (username)
            getProfile(username, () => {
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
                        <h2>I can</h2>
                        <TextList items={canDo}/>
                    </Col>
                    <Col xs={12} md={6}>
                        <h2>I cannot</h2>
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
        </>
    )
}

export default PublicProfile