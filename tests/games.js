const describe = require('mocha').describe
const it = require('mocha').it
const afterEach = require('mocha').afterEach
const cache = require('../cache')
const request = require('supertest')
const app = require('../app')
const assert = require('assert')

describe('games', function () {
  describe('GET /api/games', function () {
    this.timeout(15000)

    afterEach(function () {
      cache.clear()
    })

    it('respond top games from gamespy.com server', function (done) {
      request(app)
        .get('/api/games')
        .expect('Content-Type', /json/)
        .expect(200, function (err, res) {
          if (err) return done(err)

          assert(res.body.length > 0)
          done()
        })
    })
  })

  describe('GET /api/games/prices', function () {
    this.timeout(15000)

    it('respond prices from IsThereAnyDeal and Steam server', function (done) {
      request(app)
        .get(`/api/games/prices?appIds=${encodeURIComponent('app/570,app/730')}`)
        .expect('Content-Type', /json/)
        .expect(200, function (err, res) {
          if (err) return done(err)

          assert(res.body.length > 0)
          done()
        })
    })
  })
})
