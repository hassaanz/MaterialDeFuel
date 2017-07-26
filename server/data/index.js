const mongoose = require('mongoose')
const config = require('../../project.config')

function connectData () {
  if (config.db) {
    if (config.db.type === 'mongo') {
      mongoose.Promise = global.Promise
      return mongoose.createConnection('mongodb://localhost/test', {
        poolSize: 4,
        useMongoClient: true,
      })
    } else if (config.db.type === 'local') {
      // @TODO creae a wrapper for db so different databases can be swapped
      return Promise.reject(new Error(`Database option "${config.db.type}" not yet supported`))
    } else if (config.db.type === 'postgres') {
      // @TODO support switching database to postgres
      return Promise.reject(new Error(`Database option "${config.db.type}" not yet supported`))
    }
  } else {
    return Promise.reject(new Error('No Database configuration found in project.config'))
  }
}

module.exports = connectData
