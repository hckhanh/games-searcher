import React, { Component } from 'react'
import { FormattedNumber } from 'react-intl'
import { connect } from 'react-redux'
import { convertCurrency } from '../utils'

@connect(
  state => ({
    currency: state.currency
  })
)
export default class Currency extends Component {
  render() {
    const currency = this.props.currency.get('currency')

    return (
      <FormattedNumber
        value={convertCurrency(this.props.currency, this.props.price, this.props.fromCurrency)}
        style='currency'
        currency={currency}
      />
    )
  }
}
