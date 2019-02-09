const express = require('express')
const bodyParser = require('body-parser')
const usersRouter = require('./users/routes')
const authRouter = require('./auth/routes')
const songRouter= require('./songs/routes')
const playlistRouter = require('./playlists/routes')
const app = express()
const port = process.env.PORT || 4000

app
  .use(bodyParser.json())
  .use(usersRouter)
  .use(authRouter)
  .use(songRouter)
  .use(playlistRouter)
  .listen(port, () => console.log(`Listening on port ${port}`))