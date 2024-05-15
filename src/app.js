const express = require('express')
const app = express()

const rotaPostagens = require('../routes/postagens')

app.use('/postagens', rotaPostagens)

app.use('/teste', (req, res, next) => {
    res.status(200).send({
        mensagem: 'deu certo'
    })
})

module.exports = app;