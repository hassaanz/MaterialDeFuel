const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, index: true },
  password: String,
}, { collection: 'users' })

UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// checking if password is valid
UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password)
}
module.exports = mongoose.model('User', UserSchema)
