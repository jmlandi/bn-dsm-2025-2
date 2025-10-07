import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

const app = express()

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())

/******************** ROTAS ********************/

import indexRouter from './routes/index.js'
app.use('/', indexRouter)

import usersRouter from './routes/users.js'
app.use('/users', usersRouter)

import categoriasRouter from './routes/categorias.js'
app.use('/categorias', categoriasRouter)

import clientesRouter from './routes/clientes.js'
app.use('/clientes', clientesRouter)

import fornecedoresRouter from './routes/fornecedores.js'
app.use('/fornecedores', fornecedoresRouter)

import pedidosRouter from './routes/pedidos.js'
app.use('/pedidos', pedidosRouter)

/***********************************************/

export default app