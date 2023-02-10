import {parseResponseJSON, setContentHeader} from "../utilities/utilities"
import {MessageObj} from "../components/containers/Message"

export const getMessages = (username: string, onError: (reason: string) => void,
                            onSuccess: (messages: MessageObj[]) => void) => {
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "http://localhost:4149/getMessages", true)
    setContentHeader(xhr)
    xhr.onload = (_e) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let resData = xhr.responseText
                // console.log(resData)
                let resJson = parseResponseJSON(resData, onError)
                if (resJson)
                    onSuccess(resJson.data.messages)
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
 * Updates the read status of the message.
 * @param username    The username.
 * @param msgId       The unique ID of the message.
 * @param onError     The function to be executed if error occurs.
 * @param onSuccess   The function to be executed if update succeeds.
 */
export const updateMsgRead = (username: string, msgId: number,
                              onError: (reason: string) => void, onSuccess: () => void) => {
    let xhr = new XMLHttpRequest()
    xhr.open("PUT", "http://localhost:4149/updateMsgRead", true)
    setContentHeader(xhr)
    xhr.onload = (_e) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let resData = xhr.responseText
                // console.log(resData)
                let resJson = parseResponseJSON(resData, onError)
                if (resJson) onSuccess()
            } else {
                console.error(xhr.statusText)
                onError("An error occurred")
            }
        }
    }
    let data = {"username": username, "msgId": msgId}
    xhr.send(JSON.stringify(data))
}

export const sendMsg = (username: string, msgObj: MessageObj, onError: (reason: string) => void, onSuccess: () => void) => {
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "http://localhost:4149/sendMsg", true)
    setContentHeader(xhr)
    xhr.onload = (_e) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let resData = xhr.responseText
                // console.log(resData)
                let resJson = parseResponseJSON(resData, onError)
                if (resJson) onSuccess()
            } else {
                console.error(xhr.statusText)
                onError("An error occurred")
            }
        }
    }
    let data = {"username": username, "msgObj": msgObj}
    xhr.send(JSON.stringify(data))
}

export const deleteMsg = (username: string, id: number, onError: (reason: string) => void, onSuccess: (deletedId: number) => void) => {
    let xhr = new XMLHttpRequest()
    xhr.open("DELETE", "http://localhost:4149/deleteMsg", true)
    setContentHeader(xhr)
    xhr.onload = (_e) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let resData = xhr.responseText
                // console.log(resData)
                let resJson = parseResponseJSON(resData, onError)
                if (resJson) onSuccess(id)
            } else {
                console.error(xhr.statusText)
                onError("An error occurred")
            }
        }
    }
    let data = {"username": username, "id": id}
    xhr.send(JSON.stringify(data))
}