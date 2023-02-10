import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {useTypedDispatch} from "../../utilities/typedReduxHooks"
import {endLogout} from "../../redux/slices/sessionSlice"

const BackButton = () => {
    const dispatch = useTypedDispatch()

    return <Row style={{paddingLeft: "40px", marginTop: "20px", marginRight: 0}}>
        <Col xs="auto">
            <Button variant="secondary" onClick={() => dispatch(endLogout())}>Logout</Button>
        </Col>
    </Row>
}

export default BackButton