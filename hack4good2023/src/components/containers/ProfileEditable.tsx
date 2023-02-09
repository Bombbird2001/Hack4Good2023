import { PencilFill, CheckLg, XLg } from 'react-bootstrap-icons'
import Container from 'react-bootstrap/esm/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState, ReactNode } from 'react'

const ProfileEditable = (args: { originalComponent: ReactNode, valueType: string, formType: string,
    onSubmit: (newValue: string, onError: (reason: string) => void) => void }) => {
    const [editing, setEditing] = useState(false)
    const [newValue, setNewValue] = useState("")
    const [showError, setShowError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    return (
        <Container fluid>
            <Row>
                <Col xs="auto" className="my-auto">
                    {args.originalComponent}
                </Col>
                <Col className="my-auto" xs="auto">
                    {!editing && <Button variant="dark" onClick={() => {
                        setShowError(false)
                        setEditing(true)
                        setNewValue("")
                    }}><PencilFill /> Edit</Button>}
                    {editing &&
                        <Form>
                            <Form.Control type={args.formType} placeholder={"New " + args.valueType} value={newValue} style={{ marginBottom: 0 }}
                                          onChange={(e) => setNewValue(e.target.value)} />
                            {showError && <p className='warning-msg'>{errorMsg}</p>}
                        </Form>}
                </Col>
                {editing && <Col xs="auto" className="my-auto">
                    <Button variant="dark" onClick={() => {
                        if (!newValue) {
                            setShowError(true)
                            setErrorMsg("Please fill in " + args.valueType)
                            return
                        }
                        setEditing(false)
                        args.onSubmit(newValue, (reason) => {
                            setErrorMsg("Failed to set " + args.formType + ": " + reason)
                            setShowError(true)
                        })
                    }}><CheckLg /></Button>
                    <Button variant="dark" style={{ marginLeft: "10px" }} onClick={() => {
                        setEditing(false)
                    }}><XLg /></Button>
                </Col>}
            </Row>
        </Container>
    )
}

export default ProfileEditable