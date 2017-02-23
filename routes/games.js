const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const urls = require('../shared/urls')

router.get('/', function (req, res, next) {
  fetch(urls.TOP_100_GAMES)
    .then(res => res.json())
    .then(json => Promise.all(Object.keys(json)
                                    .map(appId => fetch(urls.GAME_DETAIL + appId))))
    .then(res => Promise.all(res.map(data => data.json())))
    .then(games => {
      let data = []
      games.forEach(game => {
        game = game[Object.keys(game)[0]]
        if (!game.success) return

        const gameData = game.data
        data.push({
          appId      : gameData.steam_appid,
          name       : gameData.name,
          headerImage: gameData.header_image,
          pc         : gameData.length !== 0,
          mac        : gameData.length !== 0,
          linux      : gameData.length !== 0
        })
      })

      res.send(data)
    })
    .catch(error => {
      next(error)
    })
})

module.exports = router
