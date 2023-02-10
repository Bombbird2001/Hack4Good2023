import {useTypedSelector, useTypedDispatch} from '../../utilities/typedReduxHooks'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import ProfileEditable from '../containers/ProfileEditable'
import {
    getProfile,
    updateCanDo,
    updateCannotDo, updateDescription,
    updateDialysisDays,
    updateDisplayName,
    updateSkills
} from '../../requests/ProfileRequests'
import {updateDispName} from '../../redux/slices/sessionSlice'
import './Profile.css'
import LogoutButton from "../containers/LogoutButton"
import TextList from "../containers/TextList"
import TextListEdit from "../containers/TextListEdit"
import {useEffect, useState} from "react"
import {Button, Col} from "react-bootstrap"
import DialysisDays from "../containers/DialysisDays"
import DialysisDaysEdit from "../containers/DialysisDaysEdit"
import TextAreaEdit from "../containers/TextAreaEdit"

export interface User {
    username: string,
    displayName: string,
    description: string,
    skills: string[],
    canDo: string[],
    cannotDo: string[],
    dialysisDays: boolean[]
}

const Profile = () => {
    const displayName = useTypedSelector(state => state.session.displayName)
    const username = useTypedSelector(state => state.session.username)
    const [description, setDescription] = useState("")
    const [editDesc, setEditDesc] = useState(false)
    const [skills, setSkills] = useState([] as string[])
    const [editSkills, setEditSkills] = useState(false)
    const [canDo, setCanDo] = useState([] as string[])
    const [editCanDo, setEditCanDo] = useState(false)
    const [cannotDo, setCannotDo] = useState([] as string[])
    const [editCannotDo, setEditCannotDo] = useState(false)
    const [dialysisDays, setDialysisDays] = useState([false, false, false, false, false, false, false])
    const [editDialysisDays, setEditDialysisDays] = useState(false)

    const dispatch = useTypedDispatch()

    useEffect(() => {
        getProfile(username, () => {
        }, (userObj) => {
            if (userObj.description) setDescription(userObj.description)
            if (userObj.skills) setSkills(userObj.skills)
            if (userObj.canDo) setCanDo(userObj.canDo)
            if (userObj.cannotDo) setCannotDo(userObj.cannotDo)
            if (userObj.dialysisDays) setDialysisDays(userObj.dialysisDays)
        })
    }, [username])

    return (
        <>
            <LogoutButton/>
            <Container fluid className="container-offset-default">
                <Row>
                    <ProfileEditable originalComponent={<h1 className="pad-vert">{displayName}</h1>} formType="text"
                                     valueType="display name" onSubmit={(newDisplayName, onError) => {
                        updateDisplayName(username, newDisplayName, dispatch, onError, (newDisplayName) => dispatch(updateDispName({displayName: newDisplayName})))
                    }}/>
                    <h5 className="username">@{username}</h5>
                </Row>
                <Row style={{marginTop: "20px"}}>
                    <Col xs={12} md={6}>
                        <h2>About</h2>
                        {!editDesc ? <p>{description}</p> :
                            <TextAreaEdit description={description} onUpdate={(newDesc) => {
                                updateDescription(username, newDesc, () => {
                                }, (newDescription) => {
                                    setDescription(newDescription)
                                })
                            }} onCancel={() => setEditDesc(false)}/>}
                        {!editDesc && <Row>
                            <Col xs="auto">
                                <Button variant="dark" onClick={() => setEditDesc(true)}
                                        style={{marginBottom: "10px"}}>Edit</Button>
                            </Col>
                        </Row>}
                    </Col>
                </Row>
                <Row style={{marginTop: "20px"}}>
                    <Col xs={12} md={6}>
                        <h2>Skills</h2>
                        {!editSkills ? <TextList items={skills}/> :
                            <TextListEdit items={skills} onChangeList={(newList) => {
                                updateSkills(username, newList.filter(item => item), () => {
                                }, (newSkills) => setSkills(newSkills))
                            }} onCancel={() => {
                                setEditSkills(false)
                            }}/>}
                        {!editSkills && <Row>
                            <Col xs="auto">
                                <Button variant="dark" onClick={() => setEditSkills(true)}
                                        style={{marginBottom: "10px"}}>Edit</Button>
                            </Col>
                        </Row>}
                    </Col>
                </Row>
                <Row style={{marginTop: "20px"}}>
                    <Col xs={12} md={6}>
                        <h2>I can</h2>
                        {!editCanDo ? <TextList items={canDo}/> :
                            <TextListEdit items={canDo} onChangeList={(newList) => {
                                updateCanDo(username, newList.filter(item => item), () => {
                                }, (newCanDo) => setCanDo(newCanDo))
                            }} onCancel={() => {
                                setEditCanDo(false)
                            }}/>}
                        {!editCanDo && <Row>
                            <Col xs="auto">
                                <Button variant="dark" onClick={() => setEditCanDo(true)}
                                        style={{marginBottom: "10px"}}>Edit</Button>
                            </Col>
                        </Row>}
                    </Col>
                    <Col xs={12} md={6}>
                        <h2>I cannot</h2>
                        {!editCannotDo ? <TextList items={cannotDo}/> :
                            <TextListEdit items={cannotDo} onChangeList={(newList) => {
                                updateCannotDo(username, newList.filter(item => item), () => {
                                }, (newCannotDo) => {
                                    setCannotDo(newCannotDo)
                                })
                            }} onCancel={() => {
                                setEditCannotDo(false)
                            }}/>}
                        {!editCannotDo && <Row>
                            <Col xs="auto">
                                <Button variant="dark" onClick={() => setEditCannotDo(true)}
                                        style={{marginBottom: "10px"}}>Edit</Button>
                            </Col>
                        </Row>}
                    </Col>
                </Row>
                <Row style={{marginTop: "20px"}}>
                    <Col xs={12} md={6}>
                        <h2>My dialysis days</h2>
                        {!editDialysisDays ? <DialysisDays days={dialysisDays}/> :
                            <DialysisDaysEdit days={dialysisDays} onChangeList={(newDays) => {
                                updateDialysisDays(username, newDays, () => {
                                }, (newDialysisDays) => {
                                    setDialysisDays(newDialysisDays)
                                })
                            }} onCancel={() => setEditDialysisDays(false)}/>}
                        {!editDialysisDays && <Row>
                            <Col xs="auto">
                                <Button variant="dark" onClick={() => setEditDialysisDays(true)}
                                        style={{marginBottom: "10px"}}>Edit</Button>
                            </Col>
                        </Row>}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Profile