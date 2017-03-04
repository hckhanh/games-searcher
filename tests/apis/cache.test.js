const cache = require('../../cache')
const DATA = { a: 1, b: 2 }

jest.useFakeTimers()

afterEach(function () {
  cache.clear()
})

test('cache an object with key "DATA"', () => {
  cache.set('DATA', DATA)
  expect(cache.get('DATA')).toBe(DATA)
})

test('cache an object with key "DATA" in 5s', (done) => {
  cache.set('DATA', DATA, 5)

  setTimeout(function () {
    expect(cache.get('DATA')).toBeUndefined()
    done()
  }, 5000)

  jest.runAllTimers()
})

test('update cache of "DATA" object within 5s expire', (done) => {
  cache.set('DATA', DATA, 5)

  // Update data in 2nd second
  setTimeout(function () {
    cache.set('DATA', DATA, 5)
  }, 2000)

  // Data need to be available in 5th second
  setTimeout(function () {
    expect(cache.get('DATA')).toBe(DATA)
    done()
  }, 5000)

  jest.runAllTimers()
})

test('clear a cache with "DATA" object', () => {
  cache.set('DATA', DATA)
  cache.clear()
  expect(cache.get('DATA')).toBeUndefined()
})
