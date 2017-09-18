const logger = require('../lib/logger')
const util = require('util')

logger.info('Starting server...')
require('../../server/data/')()
.then((con) => {
  logger.success('Connected to database server.', util.inspect(con))
})
.catch((err) => {
  logger.error('Error connecting to database:', util.inspect(err))
})
require('../../server/apiServer').listen(3030, () => {
  logger.success('API Server is running at http://localhost:3030')
})
require('../../server/main').listen(3000, () => {
  logger.success('Webpack Server is running at http://localhost:3000')
})
