const apiRouter = require('./api')
const express = require('express')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

const apiServ = express()
apiServ.use(bodyParser.json())
apiServ.use(bodyParser.urlencoded({ extended: false }))
apiServ.use(cookieParser())
apiServ.use('/api', apiRouter)
apiServ.use('*', (req, res) => {
  res.json({
    msg: 'Invalid Route',
  })
})
module.exports = apiServ
