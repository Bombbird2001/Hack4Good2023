import {Button, Modal} from "react-bootstrap"
import {Link} from "react-router-dom"
import {dateToSGStringFormat} from "../../utilities/utilities"

export interface MessageObj {
    id: number,
    title: string,
    email: string,
    message: string,
    opened: boolean,
    date: string
}

const Message = (args: {messageObj: MessageObj, show: boolean, onHide: () => void}) => {
    return (
        <Modal show={args.show} onHide={args.onHide} size="lg">
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
                <Link to={"mailto:" + args.messageObj.email} style={{textDecoration: 'none'}}><Button variant="primary">Send email</Button></Link>
                <Button variant="secondary" onClick={args.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Message