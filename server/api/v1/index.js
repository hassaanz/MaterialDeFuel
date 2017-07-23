const express = require('express')
const v1Router = express.Router()
const userRouter = require('./users')

v1Router.use('/users', userRouter)

module.exports = v1Router
