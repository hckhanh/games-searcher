const describe = require('mocha').describe
const it = require('mocha').it
const afterEach = require('mocha').afterEach
const cache = require('../cache')
const request = require('supertest')
const app = require('../app')
const assert = require('assert')

describe('rates', function () {
  describe('GET /api/rates', function () {
    afterEach(function () {
      cache.clear()
    })

    it('respond exchange rates from openexchangerates.org server', function (done) {
      request(app)
        .get('/api/rates')
        .expect('Content-Type', /json/)
        .expect(200, function (err, res) {
          if (err) return done(err)

          assert(res.body.base === 'USD')
          assert(typeof(res.body.rates) === 'object')
          done()
        })
    })
  })
})
