const {Router} = require('express')
const User = require('./model')
const bcrypt = require('bcrypt');

const router = new Router()

router.post('/users', (req, res, next) => {
    const user = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        password_confirmation: bcrypt.hashSync(req.body.password_confirmation, 10)
    }
  
    User
      .create(user)
      .then(user => { console.log(`compare ${user.password} and ${user.password_confirmation}`)
        if(user.password_confirmation === user.password){
          return res.status(201).send({
            message: "passwwords not matching"
          })
        }
        if (!user) {
          return res.status(404).send({
            message: `User does not exist`
          })
        }
        return res.status(201).send(user)
      })
      .catch(error => next(error))
     
  })


router.get('/users', (req, res, next) => {
    const limit = req.query.limit || 25
    const offset = req.query.offset || 0

    Promise.all([
        User.count(),
        User.findAll({ limit, offset })
    ])
    .then(Users => {
        res.send({ Users})
      })
      .catch(error => next(error))
})
  
module.exports = router

