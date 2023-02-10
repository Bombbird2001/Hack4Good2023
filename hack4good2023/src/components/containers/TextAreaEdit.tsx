import {Button, Col, Container, Form, Row} from "react-bootstrap"
import {useState} from "react"

const TextAreaEdit = (args: { description: string, onUpdate: (newDesc: string) => void, onCancel: () => void }) => {
    const [description, setDescription] = useState(args.description)

    return (
        <Container fluid>
            <Row>
                <Form.Control as="textarea" rows={5} value={description}
                              onChange={(e) => setDescription(e.target.value)}/>
            </Row>
            <Row>
                <Col xs="auto">
                    <Button variant="dark" onClick={() => {
                        args.onUpdate(description)
                        args.onCancel()
                    }} style={{marginBottom: "10px"}}>Confirm</Button>
                </Col>
                <Col xs="auto">
                    <Button variant="dark" onClick={args.onCancel} style={{marginBottom: "10px"}}>Cancel</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default TextAreaEdit