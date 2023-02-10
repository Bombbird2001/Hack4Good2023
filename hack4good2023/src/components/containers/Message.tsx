import {Button, Modal} from "react-bootstrap"
import {Link} from "react-router-dom"
import {dateToSGStringFormat} from "../../utilities/utilities"
import {useState} from "react"

export interface MessageObj {
    id: number,
    title: string,
    email: string,
    message: string,
    opened: boolean,
    date: number
}

const Message = (args: { messageObj: MessageObj, show: boolean, onHide: () => void, onDelete: (id: number) => void }) => {
    const [showMsg, setShowMsg] = useState(true)
    const [showDelete, setShowDelete] = useState(false)

    return (
        <>
            <Modal show={args.show && showMsg} onHide={args.onHide} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{args.messageObj.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{dateToSGStringFormat(new Date(args.messageObj.date))}</p>
                    <h4>Contact email:</h4>
                    <p>{args.messageObj.email}</p>
                    <h4>Message:</h4>
                    <p>{args.messageObj.message}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => {
                        setShowMsg(false)
                        setShowDelete(true)
                    }}>Delete</Button>
                    <Link to={"mailto:" + args.messageObj.email} style={{textDecoration: 'none'}}><Button
                        variant="primary">Send email</Button></Link>
                    <Button variant="secondary" onClick={args.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={args.show && showDelete} onHide={() => {
                setShowDelete(false)
                setShowMsg(true)
            }} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Delete message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Confirm you wish to delete {args.messageObj.title}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => {
                        args.onDelete(args.messageObj.id)
                        args.onHide()
                    }}>Delete</Button>
                    <Button variant="secondary" onClick={() => {
                        setShowDelete(false)
                        setShowMsg(true)
                    }}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Message