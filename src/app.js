import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import i18n from './middellwars/i18n'
import graphQlServer from './graphQlServer'
import indexRouter from './routes/index'
import '@babel/polyfill'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))
app.use(i18n)
graphQlServer.applyMiddleware({ app })

app.use('/', indexRouter)

export default app
