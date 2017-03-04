const app = require('../../app')
const request = require('supertest')

test('GET /api/games - respond top games from gamespy.com server', () => {
  return request(app)
    .get('/api/games')
    .then(res => {
      expect(res.body.length).toBeGreaterThan(0)
    })
})

test('GET /api/games/prices - respond prices from IsThereAnyDeal and Steam server', () => {
  return request(app)
    .get(`/api/games/prices?appIds=${encodeURIComponent('app/570,app/730')}`)
    .then(res => {
      expect(res.body.length).toBe(2)
    })
})
