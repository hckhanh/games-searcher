const app = require('../../app')
const request = require('supertest')

test('GET /rates - respond exchange rates from openexchangerates.org server', () => {
  return request(app)
    .get('/api/rates')
    .then(res => {
      expect(res.body).toEqual(
        expect.objectContaining({
          base : expect.any(String),
          rates: expect.any(Object)
        })
      )
    })
})
