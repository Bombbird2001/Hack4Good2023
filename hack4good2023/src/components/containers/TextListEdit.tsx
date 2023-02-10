import {useState} from "react"
import {Container, Row, Form, Button, Col} from "react-bootstrap"
import {XLg} from "react-bootstrap-icons"

const TextListEdit = (args: { items: string[], onChangeList: (newList: string[]) => void, onCancel: () => void }) => {
    const [items, setItems] = useState(args.items)

    return (
        <Container fluid>
            {items.map((item, index) => <Row key={index} style={{marginBottom: "10px"}}>
                <Col>
                    <Form.Control type="text" required value={item} onChange={(e) => {
                        const newItems = [...items]
                        newItems[index] = e.target.value
                        setItems(newItems)
                    }} style={{marginBottom: 0}}/>
                </Col>
                {(Object.entries(items).length > 1 &&
                    <Col xs="auto" className="my-auto"><XLg className="delete-button" onClick={() => {
                        const newItems = [...items]
                        newItems.splice(index, 1)
                        setItems(newItems)
                    }}/></Col>)}
            </Row>)}
            <Row>
                <Col xs="auto">
                    <Button variant="dark" onClick={() => {
                        setItems([...items, ""])
                    }} style={{marginBottom: "10px"}}>+ Add item</Button>
                </Col>
            </Row>
            <Row>
                <Col xs="auto">
                    <Button variant="dark" onClick={() => {
                        args.onChangeList(items)
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

export default TextListEdit