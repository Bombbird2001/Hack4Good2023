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
                // console.log("Get Profile All: " + resData)
                let resJson = parseResponseJSON(resData, onError)
                if (resJson) {
                    const parsed = resJson.data.map((o: { username: any; displayName: any; description: any; skills: string; canDo: string; cannotDo: string; dialysisDays: string }) => {
                        return {
                            username: o.username,
                            displayName: o.displayName,
                            description: o.description,
                            skills: JSON.parse(o.skills),
                            canDo: JSON.parse(o.canDo),
                            cannotDo: JSON.parse(o.cannotDo),
                            dialysisDays: JSON.parse(o.dialysisDays)
                        }
                    })
                    onSuccess(parsed)
                }
            } else {
                console.error(xhr.statusText)
                onError("An error occurred")
            }
        }
    }
    xhr.send()
}
