const describe = require('mocha').describe
const it = require('mocha').it
const request = require('supertest')
const app = require('../app')

describe('index', function () {
  describe('GET /', function () {
    it('respond index page', function (done) {
      request(app)
        .get('/')
        .expect('Content-Type', /html/)
        .expect(200, done)
    })
  })
})
