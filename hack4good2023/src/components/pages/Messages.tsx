import LogoutButton from "../containers/LogoutButton"
import Message, {MessageObj} from "../containers/Message"
import {useState} from "react"
import {dateToSGStringFormat} from "../../utilities/utilities"
import {Button, Container, Row} from "react-bootstrap"
import {Link} from "react-router-dom"

const Messages = () => {
    const [openIndex, setOpenIndex] = useState(-1)
    const [openMessage, setOpenMessage] = useState({
        title: "",
        message: "",
        email: "",
        opened: false,
        date: "2000-01-01"
    })
    const messages: MessageObj[] = [{
        title: "Title 1",
        message: "Test message",
        email: "bla@gmail.com",
        opened: false,
        date: "2022-10-02"
    }, {
        title: "Title 2",
        message: "Test message 2",
        email: "shiba@gmail.com",
        opened: true,
        date: "2022-09-02"
    }]

    return (
        <>
            <LogoutButton/>
            <Container fluid className="container-offset-default">
                <Link to={"/profile"} style={{textDecoration: 'none'}}><Button
                    style={{marginTop: "20px", marginBottom: "20px"}} variant="dark">Back to profile</Button></Link>
                <h3 style={{marginBottom: "20px"}}>Messages</h3>
                {messages.map((message, index) =>
                    <Row>
                        <Link to="" onClick={() => {
                            setOpenIndex(index)
                            setOpenMessage(message)
                        }} style={{textDecoration: 'none', color: "black"}}>
                            <h5 style={{fontWeight: message.opened ? "normal" : "bold"}}>{message.title} - {dateToSGStringFormat(new Date(message.date))}</h5>
                        </Link>
                    </Row>
                )}
                <Message messageObj={openMessage} show={openIndex >= 0 && openIndex < messages.length} onHide={() => setOpenIndex(-1)}/>
            </Container>
        </>
    )
}

export default Messages