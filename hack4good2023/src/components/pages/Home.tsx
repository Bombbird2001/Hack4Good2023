import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import {getProfileAll} from '../../requests/HomeRequests'
import './Profile.css'
import {useEffect, useState} from "react"
import {Button, Col} from "react-bootstrap"
import { User } from './Profile'
import DialysisDays from "../containers/DialysisDays"
import {Link} from "react-router-dom"

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
                <Link to={"/login"}><Button style={{marginTop: "20px"}} variant="dark">Login</Button></Link>
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
            {users.map(o =>
                <Container fluid className="container-offset-default">
                    <Row>
                        <h1 style={{marginTop: "30px"}}>{o.displayName}</h1>
                        <Link to={"/user/" + o.username}><Button variant="dark">View profile</Button></Link>
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
                            <h5 className="skills">{o.skills ? o.skills.join(", ") : ""}</h5>
                        </Col>
                    </Row>

                    <Row style={{marginTop: "20px"}}>
                        <Col xs={12} md={6}>
                            <h2>Strengths</h2>
                            <h5 className="skills">{o.canDo ? o.canDo.join(", ") : ""}</h5>
                        </Col>
                        <Col xs={12} md={6}>
                            <h2>Weaknesses</h2>
                            <h5 className="skills">{o.cannotDo ? o.cannotDo.join(", ") : ""}</h5>
                        </Col>
                    </Row>
                    <Row style={{marginTop: "20px"}}>
                        <Col xs={12} md={6}>
                            <h2>My dialysis days</h2>
                            {o.dialysisDays ? <DialysisDays days={o.dialysisDays}/> : <p>None</p>}
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    )
}

export default Home