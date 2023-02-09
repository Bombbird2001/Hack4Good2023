import {parseResponseJSON, setContentHeader} from '../utilities/utilities'

/**
 * Logs in to the portal with the supplied credentials.
 * @param username  The username to log in with.
 * @param onError   The function to be executed if login fails.
 * @param onSuccess The function to be executed if login succeeds.
 */
export const login = (username: string,
                      onError: (reason: string) => void, onSuccess: (username: string, displayName: string) => void) => {
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "http://localhost:4149/login", true)
    setContentHeader(xhr)
    xhr.onload = (_e) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let resData = xhr.responseText
                // console.log(resData)
                let resJson = parseResponseJSON(resData, onError)
                if (resJson) onSuccess(resJson.data.username, resJson.data.displayName)
            } else {
                console.error(xhr.statusText)
                onError("An error occurred")
            }
        }
    }
    let creds = {"username": username}
    xhr.send(JSON.stringify(creds))
}
