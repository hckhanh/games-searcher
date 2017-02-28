import React, { Component } from 'react'
import { FormattedNumber } from 'react-intl'
import { connect } from 'react-redux'

@connect(
  state => ({
    currency: state.currency
  })
)
export default class Currency extends Component {
  render() {
    const currency = this.props.currency.get('currency')
    const unitPrice = this.props.currency.getIn(['exchangeRates', 'rates', currency])

    return (
      <FormattedNumber value={this.props.price * unitPrice} style='currency' currency={currency} />
    )
  }
}
