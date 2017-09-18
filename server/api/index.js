const express = require('express')
const apiRouter = express.Router()
const v1Router = require('./v1')

apiRouter.use('/v1', v1Router)
apiRouter.use('*', (req, res) => {
  res.json({
    msg: 'Invalid Endpoint'
  })
})

module.exports = apiRouter
