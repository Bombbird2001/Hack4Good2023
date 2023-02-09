import {useTypedDispatch} from '../../utilities/typedReduxHooks'
import {FormEvent, useState} from 'react'
import {start} from "../../redux/slices/sessionSlice"
import {login} from '../../requests/AuthenticationRequests'
import {useNavigate} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import './Login.css'

const Login = () => {
    const [username, setUsername] = useState('')
    const [showUsernameEmpty, setShowUsernameEmpty] = useState(false)
    const [showError, setShowError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const dispatch = useTypedDispatch()
    const navigate = useNavigate()

    const onLoginClicked = (e: FormEvent<HTMLFormElement>) => {
        // Prevents page from refreshing when login button clicked
        e.preventDefault()

        setButtonDisabled(true)

        // Hide incorrect credentials message if present
        setShowError(false)

        // Ensure fields are not empty
        setShowUsernameEmpty(!username)
        if (!username) return

        // Send request to server
        login(username, (reason) => {
            setErrorMsg("Login failed: " + reason)
            setShowError(true)
            setButtonDisabled(false)
        }, (username: string, displayName: String) => {
            setButtonDisabled(false)
            dispatch(start({username: username, displayName: displayName}))
            navigate("/profile")
        })
    }

    return (
        <>
            <Container fluid>
                <Row className="row-placeholder-margin"/>
                <Row><h3 style={{textAlign: "center"}}>Login</h3></Row>
                <Row>
                    <Col xs={0} md={3}/>
                    <Col xs={12} md={6}>
                        <Form onSubmit={onLoginClicked}>
                            <Form.Group className="form-control login-form">
                                <Form.Label className="login-label">Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" value={username}
                                              onChange={(e) => setUsername(e.target.value)}/>
                                {showUsernameEmpty && <p className="warning-msg">Please input username.</p>}
                                {showError && <p className="warning-msg">{errorMsg}</p>}
                                <Button type="submit" className="btn-block login-button" variant="dark"
                                        disabled={buttonDisabled}>Login</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xs={0} md={3}/>
                </Row>
            </Container>
        </>
    )
}

export default Login