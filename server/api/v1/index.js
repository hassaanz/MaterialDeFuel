const express = require('express')
const v1Router = express.Router()
const userRouter = require('./users')
const stationRouter = require('./stations')

v1Router.use('/users', userRouter)
v1Router.use('/stations', stationRouter)
v1Router.use('*', (req, res) => {
  res.json({
    msg: '/api/v1'
  })
})
module.exports = v1Router
