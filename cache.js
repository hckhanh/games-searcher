let dataList = {}
let timeoutList = {}

module.exports.get = function (key) {
  return dataList[key]
}

module.exports.set = function (key, data, ttl) {
  if (timeoutList[key]) {
    clearTimeout(timeoutList[key])
    delete timeoutList[key]
  }

  dataList[key] = data

  if (ttl) {
    timeoutList[key] = setTimeout(() => {
      delete dataList[key]
    }, ttl * 1000)
  }
}

module.exports.clear = function () {
  for (const key in dataList) {
    if (timeoutList.hasOwnProperty(key)) {
      clearTimeout(timeoutList[key])
    }
  }

  dataList = {}
  timeoutList = {}
}
