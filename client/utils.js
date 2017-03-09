export function calculateDiscount(oldPrice, newPrice) {
  return Math.round((oldPrice - newPrice) / oldPrice * 100)
}

export function convertCurrency(exchangeRates, price, fromCurrency = 'USD') {
  const toCurrency = exchangeRates.get('currency')
  const fromUnitPrice = exchangeRates.getIn(['exchangeRates', 'rates', fromCurrency])
  const toUnitPrice = exchangeRates.getIn(['exchangeRates', 'rates', toCurrency])

  return price / fromUnitPrice * toUnitPrice
}
