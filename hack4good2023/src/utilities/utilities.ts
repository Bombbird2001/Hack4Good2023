import {AppDispatch} from "../redux/store"
import {endLogout} from "../redux/slices/sessionSlice"

/**
/**
 * Performs a full logout; session is cleared, and all data stored in redux is cleared.
 * @param dispatch The dispatch object to use.
 */
export const afterLogout = (dispatch: AppDispatch) => {
    dispatch(endLogout())
}

/**
 * Checks whether the input character is an alphabet
 * @param c The character to check
 * @returns True if character is an alphabet, else false
 */
export const isAlpha = (c: string) => {
    let code = c.charCodeAt(0)
    return (code > 64 && code < 91) || (code > 96 && code < 123)
}

/**
 * Checks whether the input character is a number
 * @param c The character to check
 * @returns True if character is a number, else false
 */
export const isNum = (c: string) => {
    let code = c.charCodeAt(0)
    return code > 47 && code < 58
}

/**
 * Parses the response text into JSON following the standard format of { success, data } if successful,
 * or { failure, code, show } if unsuccessful
 * @param resText The response text.
 * @param onError The function to be executed if failure, or parse fails.
 * @returns The data object if successful, else undefined.
 */
export const parseResponseJSON = (resText: string, onError: (reason: string) => void): any => {
    try {
        let res = JSON.parse(resText)
        if (res.status === "success") return res
        else onError(res.show ? res.code : "An error occurred")
        return undefined
    } catch (e) {
        if (e instanceof SyntaxError) {
            onError("Response error")
            console.error("Error parsing " + resText)
        } else throw e
    }
}

/**
 * Gets the current datetime in epoch seconds format.
 * @returns The current datetime in epoch seconds.
 */
export const getCurrentDatetimeEpoch = () => {
    return new Date().valueOf()
}

/**
 * Converts a date object to the SG representation string.
 * @param date The date to convert to SG date format.
 * @returns The string in SG format.
 */
export const dateToSGStringFormat = (date: Date) => {
    return date.toLocaleDateString("en-SG", {year: 'numeric', month: 'long', day: 'numeric'})
}

/**
 * Sets the Content-Type header for the XMLHttpRequest to use application/json.
 * @param xhr The XMLHttpRequest.
 */
export const setContentHeader = (xhr: XMLHttpRequest) => {
    xhr.setRequestHeader('Content-Type', 'application/json')
}
