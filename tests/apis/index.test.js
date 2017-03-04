const app = require('../../app')
const request = require('supertest')

describe('GET /', () => {
  test('respond index page', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.headers['content-type']).toEqual(expect.stringMatching(/html/))
      })
  })
})
