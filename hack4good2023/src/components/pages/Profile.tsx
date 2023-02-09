import {useTypedSelector, useTypedDispatch} from '../../utilities/typedReduxHooks'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import ProfileEditable from '../containers/ProfileEditable'
import {updateDisplayName} from '../../requests/ProfileRequests'
import {updateDispName} from '../../redux/slices/sessionSlice'
import './Profile.css'

const Profile = () => {
    const displayName = useTypedSelector(state => state.session.displayName)
    const username = useTypedSelector(state => state.session.username)

    const dispatch = useTypedDispatch()

    return (
        <>
            <Container fluid className="container-offset-default">
                <Row>
                    <ProfileEditable originalComponent={<h1 className="pad-vert">{displayName}</h1>} formType="text"
                                     valueType="display name" onSubmit={(newDisplayName, onError) => {
                        updateDisplayName(newDisplayName, dispatch, onError, (newDisplayName) => dispatch(updateDispName({displayName: newDisplayName})))
                    }}/>
                    <h5 className="username">@{username}</h5>
                </Row>
            </Container>
        </>
    )
}

export default Profile