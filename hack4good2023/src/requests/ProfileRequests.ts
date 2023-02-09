import {AppDispatch} from '../redux/store'
import {parseResponseJSON, setContentHeader} from '../utilities/utilities'

/**
 * Updates the display name of the supplied username.
 * @param displayName The new display name.
 * @param dispatch    The dispatch object to call if needed.
 * @param onError     The function to be executed if error occurs.
 * @param onSuccess   The function to be executed if update succeeds.
 */
export const updateDisplayName = (displayName: string, dispatch: AppDispatch,
                                  onError: (reason: string) => void, onSuccess: (newDisplayName: string) => void) => {
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "http://localhost:4149/updateDisplayName", true)
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
    let data = {"newDisplayName": displayName}
    xhr.send(JSON.stringify(data))
}