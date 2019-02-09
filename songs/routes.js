const {Router} = require('express')
const Playlist = require('../playlists/model')
const Song = require('./model')


const router = new Router()

router.post('/playlists/:id/songs', (req, res, next) => {
    console.log(req.body.title, req.body.artist)
    const song = {
            title: req.body.title,
            artist: req.body.artist,
            album: req.body.album,
            playlistId: req.params.id
        }
    Song
        .create(song)
        .then(song => {return res.status(201).send(song)})
        .catch(error => next(error))
    })     
  
module.exports = router;