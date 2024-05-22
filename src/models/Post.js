import { connectDB } from "../config/databaseConfig.js"


export default class Post {

    static getAll({ offset, limit }, callback) {
        connectDB.getConnection((error, conn) => {
            if (error) { return callback(error, null) }

            conn.query(
                `SELECT * FROM posts
                ORDER BY created_at
                ${offset !== null ? `LIMIT ${limit} OFFSET ${offset}` : ''}`,
                (error, result) => {
                    conn.release()

                    if (error) { return callback(error, null) }

                    return callback(null, result)
                }
            )
        })
    }

    static getCount(callback) {
        connectDB.getConnection((error, conn) => {
            if (error) { return callback(error, null) }

            conn.query(
                'SELECT COUNT(*) as count FROM posts',
                (error, result) => {
                    conn.release()

                    if (error) { return callback(error, null) }

                    return callback(null, result[0].count)
                }
            )

        })
    }

    static getById({ id }, callback) {
        connectDB.getConnection((error, conn) => {
            if (error) { return callback(error, null) }

            conn.query(
                'SELECT * FROM posts WHERE uuid=?',
                id,
                (error, result) => {
                    conn.release()

                    if (error) { return callback(error, null) }

                    return callback(null, result[0])


                }
            )
        })
    }

    static create(data, callback) {
        connectDB.getConnection((error, conn) => {
            if (error) { return callback(error, null) }

            conn.query(
                `INSERT INTO posts (uuid, title, description, created_at, updated_at, type, image, created_by, updated_by)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [data.id, data.title, data.description, data.created_at, data.created_at, data.type, data.imagePath, data.created_by, data.updated_by],
                (error, result) => {
                    conn.release()

                    if (error) { return callback(error, null) }

                    return callback(null, result)
                }
            )
        })
    }

    static update(id, data, callback) {
        connectDB.getConnection((error, conn) => {
            if (error) { return callback(error, null) }

            const fields = []
            const values = []

            Object.keys(data).forEach(key => {
                if (data[key]) {
                    fields.push(`${key} = ?`)
                    values.push(data[key])
                }
            })

            values.push(id)

            conn.query(
                `UPDATE posts SET ${fields.join(', ')} WHERE uuid = ?`,
                values,
                (error, result) => {
                    conn.release()

                    if (error) { return callback(error, null) }

                    return callback(null, result)
                })
        })
    }

    static delete(id, callback) {
        connectDB.getConnection((error, conn) => {
            if (error) { return callback(error, null) }

            conn.query(
                'DELETE FROM posts WHERE uuid=?',
                id,
                (error, result) => {
                    conn.release()

                    if (error) { return callback(error, null) }

                    return callback(null, result)
                }

            )
        })
    }
}