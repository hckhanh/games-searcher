import React from 'react'
import { FormattedNumber } from 'react-intl'
import { connect } from 'react-redux'
import { convertCurrency } from '../utils'

const Currency = ({ currency, price, fromCurrency }) => (
  <FormattedNumber
    value={convertCurrency(currency, price, fromCurrency)}
    style='currency'
    currency={currency.get('currency')}
  />
)

export default connect(
  state => ({
    currency: state.currency
  })
)(Currency)
