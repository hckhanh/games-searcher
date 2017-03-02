const describe = require('mocha').describe
const afterEach = require('mocha').afterEach
const it = require('mocha').it
const assert = require('assert')
const cache = require('../cache')

const DATA = { a: 1, b: 2 }

describe('cache', function () {
  afterEach(function () {
    cache.clear()
  })

  it('cache an object with key "DATA"', function (done) {
    cache.set('DATA', DATA)
    assert.deepStrictEqual(cache.get('DATA'), DATA)
    done()
  })

  it('cache an object with key "DATA" in 5s', function (done) {
    this.timeout(6000)
    cache.set('DATA', DATA, 5)

    setTimeout(function () {
      assert.deepEqual(cache.get('DATA'), undefined)
      done()
    }, 5000)
  })

  it('update cache an object with "DATA" expires in 5s', function (done) {
    this.timeout(6000)
    cache.set('DATA', DATA, 5)

    // Update data in 2nd second
    setTimeout(function () {
      cache.set('DATA', DATA, 5)
    }, 2000)

    // Data need to be available in 5th second
    setTimeout(function () {
      assert.deepEqual(cache.get('DATA'), DATA)
      done()
    }, 5000)
  })

  it('clear a cache with "DATA" object', function (done) {
    cache.set('DATA', DATA)
    cache.clear()
    assert.deepEqual(cache.get('DATA'), undefined)
    done()
  })
})
