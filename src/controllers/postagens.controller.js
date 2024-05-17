import { v4 as uuidv4 } from "uuid";
import { mysql } from "../database/mysql.js";

export default class PostagensController {

    getAll(req, res, next) {
        mysql.getConnection((error, conn) => {
            if (error) { return res.status(500).send({ error: error }) }

            conn.query(
                'SELECT * FROM posts',
                (error, result, fields) => {
                    conn.release()

                    if (error) { return res.status(500).send({ error: error }) }

                    const response = {
                        length: result.length,
                        posts: result.map(post => {
                            return {
                                id: post.id,
                                title: post.title,
                                descripition: post.descripition,
                                created_at: post.created_at,
                                updated_at: post.updated_at,
                                type: post.type,
                                image: post.image,
                                request: {
                                    type: 'GET',
                                    descripition: 'Get a post by id',
                                    url: 'http://localhost:3000/postagens/' + post.id
                                }
                            }
                        })
                    }

                    return res.status(200).send(response)
                }
            )

        })
    }

    get(req, res, next) {
        mysql.getConnection((error, conn) => {
            if (error) { return res.status(500).send({ error: error }) }

            conn.query(
                'SELECT * FROM posts WHERE id=?',
                req.params.id,
                (error, result, fields) => {
                    conn.release()

                    if (error) { return res.status(500).send({ error: error }) }

                    if (result.length == 0) {
                        return res.status(404).send({
                            message: `No post with id ${req.params.id} was found`
                        })
                    }

                    const response = {
                        post: {
                            id: result[0].id,
                            title: result[0].title,
                            descripition: result[0].descripition,
                            created_at: result[0].created_at,
                            updated_at: result[0].updated_at,
                            type: result[0].type,
                            image: result[0].image,
                            request: {
                                type: 'GET',
                                descripition: 'Get all posts',
                                url: 'http://localhost:3000/postagens'
                            }
                        }
                    }

                    return res.status(200).send(response)
                }
            )
        })
    }

    post(req, res, next) {

        mysql.getConnection((error, conn) => {

            if (error) { return res.status(500).send({ error: error }) }

            const id = uuidv4()
            const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ')

            conn.query(
                `INSERT INTO posts (uuid, title, description, created_at, updated_at, type, image)
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [id, req.body.titulo, req.body.descricao, created_at, created_at, req.body.tipo, req.file.path],
                (error, result, fields) => {
                    conn.release()

                    if (error) { return res.status(500).send({ error: error }) }

                    const response = {
                        message: 'Post inserted successfully!',
                        post: {
                            id: id,
                            title: req.body.titulo,
                            descripition: req.body.descricao,
                            created_at: created_at,
                            type: req.body.tipo,
                            image: req.file.path,
                            request: {
                                type: 'GET',
                                descripition: 'Get all posts',
                                url: 'http://localhost:3000/postagens'
                            }
                        }
                    }

                    return res.status(201).send(response)
                }
            )
        })
    }

    patch(req, res, next) {
        mysql.getConnection((error, conn) => {
            if (error) { return res.status(500).send({ error: error }) }

            const updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ')

            conn.query(
                `UPDATE posts
                    SET title       = ?,
                        description = ?,
                        updated_at  = ?,
                        type        = ?
                WHERE   uuid          = ?`,
                [req.body.titulo, req.body.descricao, updated_at, req.body.tipo, req.params.id],
                (error, result, fields) => {
                    conn.release()

                    if (error) { return res.status(500).send({ error: error }) }

                    const response = {
                        message: 'Post updated successfully!',
                        post: {
                            id: result.id,
                            title: req.body.titulo,
                            descripition: req.body.descricao,
                            updated_at: updated_at,
                            type: req.body.tipo,
                            request: {
                                type: 'GET',
                                descripition: 'Get a post by id',
                                url: 'http://localhost:3000/postagens/' + req.params.id
                            }
                        }
                    }

                    return res.status(202).send(response)
                }
            )
        })
    }

    delete(req, res, next) {
        mysql.getConnection((error, conn) => {
            if (error) { return res.status(500).send({ error: error }) }

            conn.query(
                'DELETE FROM posts WHERE id=?',
                req.params.id,
                (error, result, fields) => {
                    conn.release()

                    if (error) { return res.status(500).send({ error: error }) }

                    const response = {
                        message: "Post deleted successfully!",
                        request: {
                            type: 'POST',
                            descripition: 'Insert new post',
                            url: 'http://localhost:3000/postagens',
                            body: {
                                title: "String",
                                descripition: "String",
                                typo: "String"
                            }
                        }
                    }

                    return res.status(202).send(response)
                }
            )
        })
    }
}