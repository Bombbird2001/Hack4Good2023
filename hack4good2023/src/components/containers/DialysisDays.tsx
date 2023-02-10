export const dayNameArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const DialysisDays = (args: { days: boolean[] }) => {
    let dayArray = [] as number[]
    let days = ""

    const accumToString = () => {
        if (dayArray.length >= 1) {
            if (days) days += ", "
            days += dayNameArray[dayArray[0]]
        }
        if (dayArray.length === 2) {
            days += ", " + dayNameArray[dayArray[1]]
        } else if (dayArray.length >= 3) {
            days += " - " + dayNameArray[dayArray[dayArray.length - 1]]
        }
        dayArray = []
    }

    for (let [index, day] of args.days.entries()) {
        if (day)
            dayArray.push(index)
        if (!day) accumToString()
    }
    accumToString()
    if (!days) days = "None"

    return <p>{days}</p>
}

export default DialysisDays