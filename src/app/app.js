import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import router from '../routes/routes.js';

export const App = express()

App.use(morgan('dev'))
App.use(bodyParser.urlencoded({ extended: false }))
App.use(bodyParser.json())

App.use((req, res, next) => {
    res.header('Acess-Control-Allow-Origin', '*')
    res.header(
        'Acess-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )

    if (req.method === 'OPTIONS') {
        res.header('Acess-Control-Allow-Methods', 'PUT', 'POST', 'PATCH', 'DELETE', 'GET')
        return res.status(200).send({})
    }

    next();
})

// App.use(express.json())
App.use(router)

// Rota não encontrada
App.use((req, res, next) => {
    const erro = new Error("Not Found")
    erro.status = 404
    next(erro)
})

App.use((err, req, res, next) => {
    res.status(err.status || 500)
    return res.send({
        erro: {
            message: err.message
        }
    })
})