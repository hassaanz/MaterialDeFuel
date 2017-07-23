const logger = require('../lib/logger')

logger.info('Starting server...')
require('../../server/data/')()
.then((con) => {
  logger.success('Connected to database server.', con)
})
.catch((err) => {
  logger.error('Error connecting to database:', err)
})
require('../../server/main').listen(3000, () => {
  logger.success('Server is running at http://localhost:3000')
})
