import { connectDB } from "../config/databaseConfig.js";

export default class User {
    static register({ id, email, hash: password }, callback) {

        connectDB.getConnection((error, conn) => {
            if (error) return callback(error, null)

            conn.query(
                'INSERT INTO users (uuid, email, password) VALUES (?, ?, ?)',
                [id, email, password],
                (error, result) => {
                    conn.release()

                    if (error) return callback(error, null)

                    return callback(null, result)
                }
            )
        })
    }

    static getByEmail(email, callback) {
        connectDB.getConnection((error, conn) => {
            if (error) return callback(error, null)

            conn.query(
                'SELECT email FROM users WHERE email=?',
                email,
                (error, result) => {
                    conn.release()

                    if (error) return callback(error, null)

                    return callback(null, result)
                }
            )
        })
    }
}