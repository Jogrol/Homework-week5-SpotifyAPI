const {Router} = require('express')
const User = require('../users/model')
// const Song = require('../songs/model')
const Playlist = require('./model')
const auth = require('../auth/middleware')
const router = new Router()

//http :4000/playlists Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU0OTcxNDMxOSwiZXhwIjoxNTQ5NzIxNTE5fQ.469cJiSndNYPt41A1_9KkiAeHaKm9vLAm3eG7WgQdgM"
//http post :4000/playlists Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU0OTcxNDMxOSwiZXhwIjoxNTQ5NzIxNTE5fQ.469cJiSndNYPt41A1_9KkiAeHaKm9vLAm3eG7WgQdgM"

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
        const playlist = {
        name: req.body.name,
        userId: req.user.id
    }
    Playlist
      .create({playlist})
      .then(playlist => {
        return res.status(201).send(playlist)})
      .catch(error => next(error))
    
  })

  router.get('/playlists/:id', auth, (req, res) => {
      console.log(req.params.id)
    Playlist
    .findAll({ 
        where: {
            id: req.params.id,
            userId : req.user.id
             }
        })
    .then(playlist => { console.log(playlist)
        if (!playlist === []) {
            return res.send({
                message: `Playlist does not exist`
        })
    }
    return res.send(playlist)
    
    })
    .catch(error => next(error))
})


// .findById(req.params.id, {
//     include: [Company]
//   })

  module.exports = router