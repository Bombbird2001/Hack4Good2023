import {AppDispatch} from '../redux/store'
import {parseResponseJSON, setContentHeader} from '../utilities/utilities'
import {User} from "../components/pages/Profile"

export const getProfile = (username: string, onError: (reason: string) => void,
                           onSuccess: (userObj: User) => void) => {
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "http://localhost:4149/getProfile", true)
    setContentHeader(xhr)
    xhr.onload = (_e) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let resData = xhr.responseText
                // console.log(resData)
                let resJson = parseResponseJSON(resData, onError)
                if (resJson) {
                    let userObj: User = {
                        username: resJson.data.username,
                        displayName: resJson.data.displayName,
                        skills: JSON.parse(resJson.data.skills),
                        canDo: JSON.parse(resJson.data.canDo),
                        cannotDo: JSON.parse(resJson.data.cannotDo),
                        dialysisDays: JSON.parse(resJson.data.dialysisDays)
                    }
                    onSuccess(userObj)
                }
            } else {
                console.error(xhr.statusText)
                onError("An error occurred")
            }
        }
    }
    let data = {"username": username}
    xhr.send(JSON.stringify(data))
}

/**
 * Updates the display name of the supplied username.
 * @param username    The username.
 * @param displayName The new display name.
 * @param dispatch    The dispatch object to call if needed.
 * @param onError     The function to be executed if error occurs.
 * @param onSuccess   The function to be executed if update succeeds.
 */
export const updateDisplayName = (username: string, displayName: string, dispatch: AppDispatch,
                                  onError: (reason: string) => void, onSuccess: (newDisplayName: string) => void) => {
    let xhr = new XMLHttpRequest()
    xhr.open("PUT", "http://localhost:4149/updateDisplayName", true)
    setContentHeader(xhr)
    xhr.onload = (_e) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let resData = xhr.responseText
                // console.log(resData)
                let resJson = parseResponseJSON(resData, onError)
                if (resJson) onSuccess(resJson.data.displayName)
            } else {
                console.error(xhr.statusText)
                onError("An error occurred")
            }
        }
    }
    let data = {"username": username, "newDisplayName": displayName}
    xhr.send(JSON.stringify(data))
}

/**
 * Updates the skills of the supplied username.
 * @param username    The username.
 * @param skills      The new skills.
 * @param onError     The function to be executed if error occurs.
 * @param onSuccess   The function to be executed if update succeeds.
 */
export const updateSkills = (username: string, skills: string[],
                             onError: (reason: string) => void, onSuccess: (newSkills: string[]) => void) => {
    let xhr = new XMLHttpRequest()
    xhr.open("PUT", "http://localhost:4149/updateSkills", true)
    setContentHeader(xhr)
    xhr.onload = (_e) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let resData = xhr.responseText
                // console.log(resData)
                let resJson = parseResponseJSON(resData, onError)
                if (resJson) onSuccess(resJson.data.skills)
            } else {
                console.error(xhr.statusText)
                onError("An error occurred")
            }
        }
    }
    let data = {"username": username, "skills": skills}
    xhr.send(JSON.stringify(data))
}

/**
 * Updates the skills of the supplied username.
 * @param username    The username.
 * @param canDo       The new skills.
 * @param onError     The function to be executed if error occurs.
 * @param onSuccess   The function to be executed if update succeeds.
 */
export const updateCanDo = (username: string, canDo: string[],
                            onError: (reason: string) => void, onSuccess: (newCanDo: string[]) => void) => {
    let xhr = new XMLHttpRequest()
    xhr.open("PUT", "http://localhost:4149/updateCanDo", true)
    setContentHeader(xhr)
    xhr.onload = (_e) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let resData = xhr.responseText
                // console.log(resData)
                let resJson = parseResponseJSON(resData, onError)
                if (resJson) onSuccess(resJson.data.canDo)
            } else {
                console.error(xhr.statusText)
                onError("An error occurred")
            }
        }
    }
    let data = {"username": username, "canDo": canDo}
    xhr.send(JSON.stringify(data))
}

/**
 * Updates the skills of the supplied username.
 * @param username    The username.
 * @param cannotDo    The new skills.
 * @param onError     The function to be executed if error occurs.
 * @param onSuccess   The function to be executed if update succeeds.
 */
export const updateCannotDo = (username: string, cannotDo: string[],
                               onError: (reason: string) => void, onSuccess: (newCannotDo: string[]) => void) => {
    let xhr = new XMLHttpRequest()
    xhr.open("PUT", "http://localhost:4149/updateCannotDo", true)
    setContentHeader(xhr)
    xhr.onload = (_e) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let resData = xhr.responseText
                // console.log(resData)
                let resJson = parseResponseJSON(resData, onError)
                if (resJson) onSuccess(resJson.data.cannotDo)
            } else {
                console.error(xhr.statusText)
                onError("An error occurred")
            }
        }
    }
    let data = {"username": username, "cannotDo": cannotDo}
    xhr.send(JSON.stringify(data))
}

/**
 * Updates the skills of the supplied username.
 * @param username    The username.
 * @param dialysisDays The new skills.
 * @param onError     The function to be executed if error occurs.
 * @param onSuccess   The function to be executed if update succeeds.
 */
export const updateDialysisDays = (username: string, dialysisDays: boolean[],
                                   onError: (reason: string) => void, onSuccess: (newDialysisDays: boolean[]) => void) => {
    let xhr = new XMLHttpRequest()
    xhr.open("PUT", "http://localhost:4149/updateDialysisDays", true)
    setContentHeader(xhr)
    xhr.onload = (_e) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let resData = xhr.responseText
                // console.log(resData)
                let resJson = parseResponseJSON(resData, onError)
                if (resJson) onSuccess(resJson.data.dialysisDays)
            } else {
                console.error(xhr.statusText)
                onError("An error occurred")
            }
        }
    }
    let data = {"username": username, "dialysisDays": dialysisDays}
    xhr.send(JSON.stringify(data))
}