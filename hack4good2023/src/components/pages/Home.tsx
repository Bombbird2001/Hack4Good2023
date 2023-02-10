import {useTypedSelector, useTypedDispatch} from '../../utilities/typedReduxHooks'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { getProfileAll } from '../../requests/HomeRequests'
import './Profile.css'
import LogoutButton from "../containers/LogoutButton"
import TextList from "../containers/TextList"
import TextListEdit from "../containers/TextListEdit"
import {useEffect, useState} from "react"
import {Button, Col} from "react-bootstrap"

export interface User {
    username: string,
    displayName: string,
    description: string,
    skills: string[],
    canDo: string[],
    cannotDo: string[],
    dialysisDays: boolean[]
}

const Home = () => {
    const displayName = useTypedSelector(state => state.session.displayName)
    const username = useTypedSelector(state => state.session.username)
    const about = "test"

    const dispatch = useTypedDispatch()

    useEffect(() => {
        getProfileAll("", () => {
            console.log("Failed Request")
        }, (userObj) => {
            console.log("Test : " + userObj)
        })
    })

    return (
        <>
            <Container fluid className="container-offset-default">
                <Row>
                    <h5 className="username">@{username}</h5>
                </Row>
                <Row style={{marginTop: "20px"}}>
                    <Col xs={12} md={6}>
                        <h2>About</h2>
                        <h5 className="about">{about}</h5>
                    </Col>
                </Row>
                <Row style={{marginTop: "20px"}}>
                    <Col xs={12} md={6}>
                        <h2>Skills</h2>
                        <h5 className="skills">{about}</h5>
                    </Col>
                </Row>
                <Row style={{marginTop: "20px"}}>
                    <Col xs={12} md={6}>
                        <h2>Strengths</h2>
                        <h5 className="skills">{about}</h5>
                    </Col>
                    <Col xs={12} md={6}>
                        <h2>Weaknesses</h2>
                        <h5 className="skills">{about}</h5>
                    </Col>
                </Row>
                <Row style={{marginTop: "20px"}}>
                    <Col xs={12} md={6}>
                        <h2>My dialysis days</h2>
                        <h5 className="skills">{about}</h5>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Home