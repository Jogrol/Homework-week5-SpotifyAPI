const {Router} = require('express')
const User = require('../users/model')
const Playlist = require('./model')
const auth = require('../auth/middleware')

const router = new Router()

router.get('/playlists', auth, (req, res) => {
    Playlist
    .findAll({ where: {userId : req.user.id}})
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `"its a match"`
        })
      }
      return res.send(playlist)
    })
    .catch(error => next(error))
  })


router.post('/playlists', auth, (req, res, next) => {
    Playlist
      .create(req.body)
      .then(playlist => { console.log(playlist)
        if (!playlist) {
          return res.status(404).send({
            message: `Playlist does not exist`
          })
        }
        return res.status(201).send(playlist)
      })
      .catch(error => next(error))
  })
  
  module.exports = router