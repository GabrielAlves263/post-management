import express from "express";
const router = express.Router()

// Listar todas as postagens.
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: "GET"
    })
})

// Criar uma nova postagem.
router.post('/', (req, res, next) => {

    const postagem = {
        titulo: req.body.titulo,
        descricao: req.body.descricao
    }

    res.status(201).send({
        mensagem: 'POST',
        postagem: postagem
    })
})

// Buscar uma postagem por ID.
router.get('/:id_postagem', (req, res, next) => {
    const id = req.params.id_postagem

    res.status(200).send({
        id: id
    })
})

// Atualizar uma postagem existente.
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'PATCH'
    })
})

// Excluir uma postagem.
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'DELETE'
    })
})

export const rotaPostagens = router