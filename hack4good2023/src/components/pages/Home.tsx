import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import {getProfileAll} from '../../requests/HomeRequests'
import './Profile.css'
import {useEffect, useState} from "react"
import {Col} from "react-bootstrap"
import { User } from './Profile'

const Home = () => {
    const [users, setUsers] = useState([] as User[])

    useEffect(() => {
        getProfileAll("", () => {
            console.log("Failed Request")
        }, (users) => {
            setUsers(users)
        })
    })

    return (
        <>
            <Container fluid>
                <Row className="row-placeholder-margin"/>
                <Row><h1 style={{textAlign: "center"}}>Kidnet</h1></Row>
                <Row><h4 style={{textAlign: "center"}}>
                    Patients undergoing kidney dialysis are individuals who have experienced a chronic illness, but this should not be a barrier to their employment. These individuals have demonstrated strength and resilience in managing their condition and can bring valuable skills and experiences to the workplace.
                </h4></Row> 
                <Row><h4 style={{textAlign: "center"}}>
                    In addition, advancements in dialysis technology have made it possible for many individuals to lead active and productive lives, including working. Many patients are able to manage their dialysis schedule around their work schedule, and with accommodations and support, they can perform their job duties effectively.
                </h4></Row> 
                <Row><h4 style={{textAlign: "center"}}>
                    It's important for employers to recognize that diversity and inclusion in the workplace extend to individuals with disabilities, including those undergoing dialysis. Hiring individuals with diverse experiences and perspectives can bring new ideas, enhance team dynamics, and contribute to a positive workplace culture.
                </h4></Row> 
                <Row><h4 style={{textAlign: "center"}}>
                    By considering individuals undergoing dialysis for employment opportunities, employers can tap into a talented and dedicated pool of candidates and make a positive impact in their lives.
                    Below are some of the patients that are a strong pick for your team!
                </h4></Row>
            </Container>

            {users.map((o, i) => 
                <Container fluid className="container-offset-default">
                    <Row>
                        <h5 className="username">@{o.username}</h5>
                    </Row>
                    <Row style={{marginTop: "20px"}}>
                        <Col xs={12} md={6}>
                            <h2>About</h2>
                            <h5 className="about">{o.description}</h5>
                        </Col>
                    </Row>

                    <Row style={{marginTop: "20px"}}>
                        <Col xs={12} md={6}>
                            <h2>Skills</h2>
                            <h5 className="skills">{o.skills}</h5>
                        </Col>
                    </Row>
                    
                    <Row style={{marginTop: "20px"}}>
                        <Col xs={12} md={6}>
                            <h2>Strengths</h2>
                            <h5 className="skills">{o.canDo}</h5>
                        </Col>
                        <Col xs={12} md={6}>
                            <h2>Weaknesses</h2>
                            <h5 className="skills">{o.cannotDo}</h5>
                        </Col>
                    </Row>
                    <Row style={{marginTop: "20px"}}>
                        <Col xs={12} md={6}>
                            <h2>My dialysis days</h2>
                            <h5 className="skills">{o.dialysisDays}</h5>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    )
}

export default Home