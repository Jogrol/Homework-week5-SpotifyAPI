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
        // 1. find user based on email address
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
                // 2. use bcrypt.compareSync to check the password against the stored hash
                if (bcrypt.compareSync(req.body.password, entity.password)) {

                    // 3. if the password is correct, return a JWT with the userId of the user (user.id)
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

//http :4000/secret-endpoint Authorization:"Bearer thisismytoken"
//http :4000/secret-endpoint Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTU0OTcwNTQwMCwiZXhwIjoxNTQ5NzEyNjAwfQ.88LpsL1SjLOdcSGS0mxTLB-FkEGDP2D4jGuFtpwyLi0"