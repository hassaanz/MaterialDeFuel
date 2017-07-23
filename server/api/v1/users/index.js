const express = require('express')
const userRouter = express.Router()
const User = require('../../../data/models/user')

userRouter.get('/:id', (req, res, next) => {
  const userProjection = {
    firstName: 1,
    lastName: 1,
    email: 1
  }
  User.findById(req.params.id, userProjection).exec()
  .then((user) => {
    return res.json(user)
  })
  .catch((err) => {
    return res.status(500).json({
      error: {
        msg: 'DB_ERR',
        obj: err,
        code: 101
      },
    })
  })
})

userRouter.post('/', (req, res, next) => {
  const user = req.body.user
  if (!user) {
    return res.status(400).json({
      error: {
        msg: 'INV_REQ',
        obj: {
          message: 'No user data in request body',
          ref: 'POST /users'
        },
        code: 1
      }
    })
  }
  let userDb = new User(user)
  req.json(userDb)
})

module.exports = userRouter
