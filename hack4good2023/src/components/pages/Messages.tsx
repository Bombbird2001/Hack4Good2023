import LogoutButton from "../containers/LogoutButton"
import Message, {MessageObj} from "../containers/Message"
import {useEffect, useState} from "react"
import {dateToSGStringFormat} from "../../utilities/utilities"
import {Button, Container, Row} from "react-bootstrap"
import {Link} from "react-router-dom"
import {useTypedSelector} from "../../utilities/typedReduxHooks"
import {deleteMsg, getMessages, updateMsgRead} from "../../requests/MessageRequests"

const Messages = () => {
    const username = useTypedSelector(state => state.session.username)
    const [openIndex, setOpenIndex] = useState(-1)
    const [openMessage, setOpenMessage] = useState({
        id: -1,
        title: "",
        message: "",
        email: "",
        opened: false,
        date: 0
    })
    const [messages, setMessages] = useState([] as MessageObj[])

    useEffect(() => {
        getMessages(username, () => {
        }, (newMessages) => {
            setMessages(newMessages)
        })
    }, [username])

    return (
        <>
            <LogoutButton/>
            <Container fluid className="container-offset-default">
                <Link to={"/profile"} style={{textDecoration: 'none'}}><Button
                    style={{marginTop: "20px", marginBottom: "20px"}} variant="dark">Back to profile</Button></Link>
                <h3 style={{marginBottom: "20px"}}>Messages
                    ({messages.reduce((accum, msg) => accum + (msg.opened ? 0 : 1), 0)} unread)</h3>
                {messages.map((message, index) =>
                    <Row key={message.id}>
                        <Link to="" onClick={() => {
                            setOpenIndex(index)
                            setOpenMessage(message)
                            updateMsgRead(username, message.id, () => {
                            }, () => {
                                const newMsg = {...message, opened: true}
                                setMessages(messages.map(msg => msg.id === message.id ? newMsg : msg))
                            })
                        }} style={{textDecoration: 'none', color: "black"}}>
                            <h5 style={{fontWeight: message.opened ? "normal" : "bold"}}>{message.title} - {dateToSGStringFormat(new Date(message.date))}</h5>
                        </Link>
                    </Row>
                )}
                {messages.length === 0 && <p>You have no messages</p>}
                <Message messageObj={openMessage} show={openIndex >= 0 && openIndex < messages.length}
                         onHide={() => setOpenIndex(-1)} onDelete={(id) => deleteMsg(username, id, () => {
                }, (id) => {
                    setMessages(messages.filter(msg => msg.id !== id))
                })}/>
            </Container>
        </>
    )
}

export default Messages