const mongoose = require('mongoose')
const config = require('../../project.config')

function connectData () {
  if (config.db) {
    if (config.db.type === 'mongo') {
      return mongoose.connect('mongodb://localhost/test')
    } else if (config.db.type === 'local') {
      // @TODO creae a wrapper for db so different databases can be swapped
    } else if (config.db.type === 'postgres') {

    }
  } else {
    return Promise.reject(new Error('No Database configuration found in project.config'))
  }
}

module.exports = connectData
