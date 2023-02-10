import {useState} from "react"
import {Container, Row, Form, Col, Button} from "react-bootstrap"
import {dayNameArray} from "./DialysisDays"

const DialysisDaysEdit = (args: { days: boolean[], onChangeList: (newDays: boolean[]) => void, onCancel: () => void }) => {
    const [days, setDays] = useState(args.days)

    return (
        <Container fluid>
            {days.map((day, index) =>
                <Row key={index}>
                    <Form.Check type="checkbox" label={dayNameArray[index]} checked={days[index]} onChange={(e) => {
                        const newDays = [...days]
                        newDays[index] = e.target.checked
                        setDays(newDays)
                    }}/>
                </Row>
            )}
            <Row>
                <Col xs="auto">
                    <Button variant="dark" onClick={() => {
                        args.onChangeList(days)
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

export default DialysisDaysEdit