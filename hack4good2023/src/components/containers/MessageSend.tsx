import {Button, Col, Modal, Row, Form} from "react-bootstrap"
import {MessageObj} from "./Message"
import {FormEvent, useState} from "react"
import {getCurrentDatetimeEpoch} from "../../utilities/utilities"

const MessageSend = (args: {
    displayName: string, show: boolean, onSend: (msg: MessageObj) => void, onHide: () => void
}) => {
    const [title, setTitle] = useState("")
    const [titleWarn, setTitleWarn] = useState(false)
    const [email, setEmail] = useState("")
    const [emailWarn, setEmailWarn] = useState(false)
    const [message, setMessage] = useState("")
    const [messageWarn, setMessageWarn] = useState(false)

    /**
     * Function to be executed when the user clicks the send message button; performs checks for the
     * input and calls the appropriate callback functions
     * @param e The change event for the HTML form
     */
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!title || !email || !message) {
            setTitleWarn(!title)
            setEmailWarn(!emailWarn)
            setMessageWarn(!message)
            return
        }

        args.onSend({
            id: -1,
            title: title,
            email: email,
            message: message,
            opened: false,
            date: getCurrentDatetimeEpoch()
        })

        setTitleWarn(false)
        setEmailWarn(false)
        setMessageWarn(false)
    }

    return (
        <Modal show={args.show} onHide={args.onHide} size="lg" backdrop="static">
            <Form onSubmit={onSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Send message to {args.displayName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Title" value={title}
                                          onChange={(e) => setTitle(e.target.value)}/>
                            {titleWarn && <p className="warning-msg">Please input title.</p>}
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Contact email" value={email}
                                          onChange={(e) => setEmail(e.target.value)}/>
                            {emailWarn && <p className="warning-msg">Please input your contact email.</p>}
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Label>Message</Form.Label>
                            <Form.Control as="textarea" rows={5} placeholder="Your message" value={message}
                                          onChange={(e) => setMessage(e.target.value)}/>
                            {messageWarn && <p className="warning-msg">Please input message.</p>}
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">Send message</Button>
                    <Button variant="secondary" onClick={args.onHide}>Cancel</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default MessageSend