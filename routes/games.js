const express = require('express')
const router = express.Router()
const fetch = require('axios')
const steamAPI = require('../apis/steam')
const itadAPI = require('../apis/itad')
const cache = require('../cache')

const TTL_IN_SECONDS = 604800 // 7 days (1 week)

router.get('/', function(req, res, next) {
  const topGames = cache.get('TOP_GAMES')
  if (topGames) {
    return res.send(topGames)
  }

  fetch(steamAPI.TOP_GAMES)
    .then(({ data }) => Promise.all(data.map(game => fetch(steamAPI.GAME_DETAIL + game.steamAppID))))
    .then(games => {
      let data = []
      games.forEach(({ data: game }) => {
        game = game[Object.keys(game)[0]]
        if (!game.success) return

        const gameData = game.data
        data.push({
          app_id: gameData.steam_appid,
          name: gameData.name,
          is_free: gameData.is_free,
          platforms: gameData.platforms,
          header_image: gameData.header_image,
          steam_price: gameData.price_overview,
          short_description: gameData.short_description
        })
      })

      cache.set('TOP_GAMES', data, TTL_IN_SECONDS)

      res.send(data)
    })
    .catch(error => {
      next(error)
    })
})

router.get('/detail/:appId', function(req, res, next) {
  const { appId } = req.params
  fetch(steamAPI.GAME_DETAIL + appId)
    .then(({ data: gameDetails }) => {
      const gameDetail = gameDetails[appId].data
      res.send(gameDetail)
    })
    .catch(error => {
      next(error)
    })
})

router.get('/prices', function(req, res, next) {
  let plainData = []

  fetch(itadAPI.PLAINS_BY_ID + req.query.appIds)
    .then(({ data: plains }) => {
      plainData = plains.data
      return fetch(itadAPI.CURRENT_PRICES + encodeURIComponent(Object.values(plainData).join(',')))
    })
    .then(({ data: prices }) => {
      const appIds = Object.keys(plainData)
      const plainIds = Object.values(plainData)

      let priceList = []
      plainIds.forEach(plainId => {
        const priceInfo = prices.data[plainId]
        if (priceInfo) {
          const firstPrice = priceInfo.list[0]
          if (firstPrice) {
            firstPrice.app_id = +appIds[plainIds.indexOf(plainId)].match(/\d+$/)[0]
            priceList.push(firstPrice)
          }
        }
      })

      res.send(priceList)
    })
    .catch(error => {
      next(error)
    })
})

router.get('/prices/:appId', function(req, res, next) {
  let plainData = []

  fetch(`${itadAPI.PLAINS_BY_ID}app/${req.params.appId}`)
    .then(({ data: plains }) => {
      plainData = plains.data
      return fetch(itadAPI.CURRENT_PRICES + encodeURIComponent(Object.values(plainData).join(',')))
    })
    .then(({ data: prices }) => {
      const plainId = Object.values(plainData)[0]
      res.send(prices.data[plainId].list)
    })
    .catch(error => {
      next(error)
    })
})

router.get('/search', function(req, res, next) {
  fetch(steamAPI.SEARCH_GAME_BY_NAME + req.query.name)
    .then(({ data: games }) => Promise.all(games.items.map(game => fetch(steamAPI.GAME_DETAIL + game.id))))
    .then(games => {
      let data = []
      games.forEach(({ data: game }) => {
        game = game[Object.keys(game)[0]]
        if (!game.success) return

        const gameData = game.data
        data.push({
          app_id: gameData.steam_appid,
          name: gameData.name,
          is_free: gameData.is_free,
          header_image: gameData.header_image,
          platforms: gameData.platforms,
          steam_price: gameData.price_overview
        })
      })

      res.send(data)
    })
    .catch(error => {
      next(error)
    })
})

router.get('/suggestions', function(req, res, next) {
  fetch(steamAPI.SEARCH_GAME_BY_NAME + req.query.name)
    .then(({ data: games }) => {
      games = games.items.map(game => ({
        name: game.name,
        tiny_image: game.tiny_image
      }))

      res.send(games)
    })
    .catch(error => {
      next(error)
    })
})

module.exports = router
