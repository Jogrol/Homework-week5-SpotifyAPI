const {Router} = require('express')
const {toJWT} = require('../auth/jwt')
const User = require('../users/model')
const bcrypt = require('bcrypt');
const router = new Router()
const auth = require('./middleware')

// Log in and compare if data is avalaible.
router.post('/tokens', (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    if (!email || !password) {
        return res.status(400).send({
            message: 'Please supply a valid email and password'
        })
    } else {
        User
            .findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(entity => {
                if (!entity) {
                    res.status(400).send({
                        message: 'User with that email does not exist'
                    })
                }
                if (bcrypt.compareSync(req.body.password, entity.password)) {
                    res.send({
                        jwt: toJWT({
                            userId: entity.id
                        })
                    })
                } else {
                    res.status(400).send({
                        message: 'Password was incorrect'
                    })
                }
            })
            .catch(err => {
                console.error(err)
                res.status(500).send({
                    message: 'Something went wrong'
                })
            })
    }
})

// Old login witout any middleware
router.get('/secret-endpoint', auth, (req, res) => {
    res.send({
      message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
    })
  })

module.exports = router