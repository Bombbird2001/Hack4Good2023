import {createConnection} from 'mysql2'

let conn = createConnection({
    host: "localhost",
    user: "root",
    password: "hack4good2023_syyt"
})

conn.connect((e) => {
    if (e)
        throw e;

    console.log("Connected!")
})

export const createTable = () => {
    console.log("Table called")
}