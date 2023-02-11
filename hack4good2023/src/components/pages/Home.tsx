import {useTypedSelector} from '../../utilities/typedReduxHooks'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import {getProfileAll} from '../../requests/HomeRequests'
import './Profile.css'
import {useEffect} from "react"
import {Col} from "react-bootstrap"

const Home = () => {
    const username = useTypedSelector(state => state.session.username)
    const about = "test"

    useEffect(() => {
        getProfileAll("", () => {
            console.log("Failed Request")
        }, (userObj) => {
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