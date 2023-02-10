import {Connection, createConnection, RowDataPacket} from 'mysql2/promise'
import {ResultSetHeader} from "mysql2"

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
    const [rows] = await conn.execute('show tables', [])
    const rowArray: RowDataPacket[] = rows as RowDataPacket[]
    for (let row of rowArray) {
        if (row["Tables_in_profiles"] === 'users')
            return;
    }
    await conn.execute(
        'CREATE TABLE users ( username VARCHAR(255), displayName VARCHAR(255), description TEXT(65535), skills TEXT(65535), canDo TEXT(65535), cannotDo TEXT(65535), dialysisDays VARCHAR(255), PRIMARY KEY (username))')
}

/**
 * Checks with the database whether the username exists, and returns the display name if username found, otherwise undefined
 * @param username The username to check
 */
export const login = async (username: string): Promise<string | undefined> => {
    const [rows] = await conn.execute('SELECT displayName FROM users WHERE username = ? LIMIT 1', [username])
    const rowArray: RowDataPacket[] = rows as RowDataPacket[]
    if (rowArray.length === 0)
        return undefined
    return rowArray[0]["displayName"]
}

/**
 * Creates a new user if username does not already exist
 * @param username    The username to set
 * @param displayName The display name to set
 */
export const createAccount = async (username: string, displayName: string) => {
    const [existingUsername] = await conn.execute('SELECT username FROM users WHERE username = ? LIMIT 1', [username])
    const rowArray: RowDataPacket[] = existingUsername as RowDataPacket[]
    if (rowArray.length > 0)
        return false
    await conn.execute('INSERT INTO users (username, displayName) VALUES (?, ?)', [username, displayName])
    return true
}

export const getProfile = async (username: string) => {
    const [rows] = await conn.execute('SELECT * FROM users WHERE username = ? LIMIT 1', [username])
    const rowArray: RowDataPacket[] = rows as RowDataPacket[]
    if (rowArray.length === 0)
        return undefined
    return rowArray[0]
}

export const updateDisplayName = async (username: string, newDisplayName: string) => {
    const [rows] = await conn.execute('UPDATE users SET displayName = ? WHERE username = ?', [newDisplayName, username])
    const resultSet = rows as ResultSetHeader
    return resultSet.affectedRows > 0
}

export const updateDescription = async (username: string, newDescription: string) => {
    const [rows] = await conn.execute('UPDATE users SET description = ? WHERE username = ?', [newDescription, username])
    const resultSet = rows as ResultSetHeader
    return resultSet.affectedRows > 0
}

export const updateSkills = async (username: string, skills: string) => {
    const [rows] = await conn.execute('UPDATE users SET skills = ? WHERE username = ?', [skills, username])
    const resultSet = rows as ResultSetHeader
    return resultSet.affectedRows > 0
}

export const updateCanDo = async (username: string, canDo: string) => {
    const [rows] = await conn.execute('UPDATE users SET canDo = ? WHERE username = ?', [canDo, username])
    const resultSet = rows as ResultSetHeader
    return resultSet.affectedRows > 0
}

export const updateCannotDo = async (username: string, cannotDo: string) => {
    const [rows] = await conn.execute('UPDATE users SET cannotDo = ? WHERE username = ?', [cannotDo, username])
    const resultSet = rows as ResultSetHeader
    return resultSet.affectedRows > 0
}

export const updateDialysisDays = async (username: string, dialysisDays: string) => {
    const [rows] = await conn.execute('UPDATE users SET dialysisDays = ? WHERE username = ?', [dialysisDays, username])
    const resultSet = rows as ResultSetHeader
    return resultSet.affectedRows > 0
}