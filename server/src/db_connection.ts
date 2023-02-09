import {Connection, createConnection, RowDataPacket} from 'mysql2/promise'

let conn: Connection;

export const startConnection = async () => {
    conn = await createConnection({
        host: "localhost",
        user: "root",
        password: "hack4good2023_syyt",
        database: "profiles"
    })
    await conn.connect()
    console.log("Connected to database")

    await createTable()
}

/**
 * Initializes the users table if it does not yet exist
 */
const createTable = async () => {
    const [rows, fields] = await conn.execute('show tables', [])
    const rowArray: RowDataPacket[] = rows as RowDataPacket[]
    for (let row of rowArray) {
        if (row["Tables_in_profiles"] === 'users')
            return;
    }
    await conn.execute('CREATE TABLE users ( username VARCHAR(255), displayName VARCHAR(255), PRIMARY KEY (username))')
}

/**
 * Checks with the database whether the username exists, and returns the display name if username found, otherwise undefined
 * @param username The username to check
 */
export const login = async (username: string): Promise<string | undefined> => {
    const [rows, fields] = await conn.execute('SELECT * FROM users WHERE username = ? LIMIT 1', [username])
    const rowArray: RowDataPacket[] = rows as RowDataPacket[]
    if (rowArray.length === 0)
        return undefined
    return rowArray[0]["displayName"]
}