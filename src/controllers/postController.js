import { v4 as uuidv4 } from "uuid";
import Post from "../models/Post.js";
import { createPostSchema, updatePostSchema } from "../models/PostSchema.js";

export default class PostController {

    static getAll(req, res, next) {

        const { page, limit = 10 } = req.query;
        const offset = page ? (page - 1) * limit : null

        Post.getAll({ offset, limit }, (error, posts) => {
            if (error) { return res.status(500).send({ error: error }) }

            Post.getCount((error, count) => {
                if (error) { return res.status(500).send({ error: error }) }

                const totalPages = Math.ceil(count / limit)

                if (posts.length === 0) {
                    return res.status(400).send({ message: "No posts were found" })
                }

                const pagination = {
                    totalItens: count,
                    totalPages,
                    currentPage: page,
                    pageSize: posts.length
                }

                const response = {
                    posts: posts.map(post => ({
                        id: post.uuid,
                        title: post.title,
                        descripition: post.descripition,
                        created_at: post.created_at,
                        updated_at: post.updated_at,
                        type: post.type,
                        image: post.image,
                        request: {
                            type: 'GET',
                            description: 'Get a post by id',
                            url: `http://localhost:3000/postagens/${post.id}`
                        }
                    })),
                    pagination,
                }

                res.status(200).send(response)
            })
        })
    }

    static get(req, res, next) {

        const id = req.params.id

        Post.getById({ id }, (error, result) => {
            if (error) { return res.status(500).send({ error: error }) }

            if (result.length == 0) {
                return res.status(404).send({
                    message: `No post with id ${req.params.id} was found`
                })
            }

            const response = {
                post: {
                    id: result.uuid,
                    title: result.title,
                    descripition: result.descripition,
                    created_at: result.created_at,
                    updated_at: result.updated_at,
                    type: result.type,
                    image: result.image,
                    request: {
                        type: 'GET',
                        descripition: 'Get all posts',
                        url: 'http://localhost:3000/postagens'
                    }
                }
            }

            return res.status(200).send(response)
        })
    }

    static create(req, res, next) {

        const { error } = createPostSchema.validate(req.body)
        if (error) {
            return res.status(400).send({ error: error.details[0].message })
        }

        const { title, description, type } = req.body
        const imagePath = req.file ? req.file.path : null
        const id = uuidv4()
        const created_at = new Date()

        const newPost = {
            id,
            title,
            description,
            created_at: created_at,
            updated_at: created_at,
            type,
            imagePath
        }

        Post.create(newPost, (error, result) => {
            if (error) { return res.status(500).send({ error: error }) }

            const response = {
                message: 'Post inserted successfully!',
                post: {
                    id: id,
                    title: title,
                    description: description,
                    created_at: created_at,
                    type: type,
                    image: imagePath,
                    request: {
                        type: 'GET',
                        descripition: 'Get all posts',
                        url: 'http://localhost:3000/postagens'
                    }
                }
            }

            return res.status(201).send(response)
        })
    }

    static update(req, res, next) {
        const id = req.params.id
        const { error } = updatePostSchema.validate(req.body)
        if (error) { return res.status(400).send({ error: error.details[0].message }) }

        const updatePost = {
            ...req.body,
            image: req.file ? req.file.path : null,
            updated_at: new Date()
        }

        Post.update(id, updatePost, (error, result) => {
            if (error) { return res.status(500).send({ error: error }) }

            if (result.affectedRows === 0) {
                return res.status(404).send({
                    message: `No post with id ${id} was found`
                })
            }

            const response = {
                message: 'Post updated successfully!',
                post: {
                    request: {
                        type: 'GET',
                        descripition: 'Get a post by id',
                        url: 'http://localhost:3000/postagens/' + id
                    }
                }
            }

            return res.status(200).send(response)

        })
    }

    static delete(req, res, next) {
        const id = req.params.id

        Post.delete(id, (error, result) => {
            if (error) { return res.status(500).send({ error: error }) }

            if (result.affectedRows === 0) {
                return res.status(404).send({
                    message: `No post with id ${id} was found`
                })
            }

            const response = {
                message: "Post deleted successfully!",
                request: {
                    type: 'POST',
                    descripition: 'Insert new post',
                    url: 'http://localhost:3000/postagens',
                    body: {
                        title: "String",
                        descripition: "String",
                        type: "String"
                    }
                }
            }
            return res.status(202).send(response)
        })
    }
}