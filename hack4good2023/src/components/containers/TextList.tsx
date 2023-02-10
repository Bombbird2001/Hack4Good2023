import {Container, Row} from "react-bootstrap"

const TextList = (args: {items: string[]}) => {

    return (
        <Container fluid>
            {args.items.map((item, index) => <Row key={index}>
                <p style={{marginBottom: "5px"}}>{item}</p>
            </Row>)}
        </Container>
    )
}

export default TextList