const {Router} = require('express')
// const User = require('../users/model')
const Playlist = require('./model')

const router = new Router()

router.get('/playlists', (req, res, next) => {
    const limit = req.query.limit || 25
    const offset = req.query.offset || 0
  //Use promise all if you want to "fire" them together.
    Promise.all([
        Playlist.count(),
        Playlist.findAll({ limit, offset })
    ])
    .then(playlists => {
        res.send({ playlists})
      })
      .catch(error => next(error))
})


router.post('/playlists', (req, res, next) => {
    Playlist
      .create(req.body)
      .then(playlist => {
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