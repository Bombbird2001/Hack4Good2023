import {AppDispatch} from '../redux/store'
import {parseResponseJSON, setContentHeader} from '../utilities/utilities'
import {User} from "../components/pages/Profile"

export const getProfileAll = (username: string, onError: (reason: string) => void,
                            onSuccess: (messages: User[]) => void) => {
    let xhr = new XMLHttpRequest()
    xhr.open("GET", "http://localhost:4149/getProfileAll", true)
    setContentHeader(xhr)
    xhr.onload = (_e) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let resData = xhr.responseText
                console.log("Get Profile All: " + resData)
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
