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

                    res.status(200).send({
                        response: result
                    })
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

                    res.status(200).send({
                        response: result
                    })
                }
            )
        })
    }

    post(req, res, next) {
        mysql.getConnection((error, conn) => {

            if (error) { return res.status(500).send({ error: error }) }

            conn.query(
                'INSERT INTO posts (title, description, created_at, updated_at, type) VALUES (?, ?, ?, ?, ?)',
                [req.body.titulo, req.body.descricao, req.body.criado, req.body.atualizado, req.body.tipo],
                (error, result, fields) => {
                    conn.release()

                    if (error) { return res.status(500).send({ error: error }) }

                    res.status(201).send({
                        mensagem: 'Postagem inserida com sucesso!',
                        id_postagem: result.insertId
                    })
                }
            )
        })
    }

    patch(req, res, next) {
        mysql.getConnection((error, conn) => {
            if (error) { return res.status(500).send({ error: error }) }

            conn.query(
                `UPDATE posts
                    SET title       = ?,
                        description = ?,
                        type        = ?
                WHERE   id          = ?`,
                [req.body.titulo, req.body.descricao, req.body.tipo, req.params.id],
                (error, result, fields) => {
                    conn.release()

                    if (error) { return res.status(200).send({ error: error }) }

                    res.status(202).send({
                        mensagem: 'Postagem atualizada com sucesso!',
                        id_postagem: result.insertId
                    })
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

                    res.status(202).send({
                        mensagem: 'Postagem deletada com sucesso!',
                        id_postagem: result.insertId
                    })
                }
            )
        })
    }
}