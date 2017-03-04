import { Select } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getRates, setCurrency } from '../actions/currency'
const Option = Select.Option

@connect(
  state => ({
    currency: state.currency
  }),
  dispatch => ({
    getRates   : bindActionCreators(getRates, dispatch),
    setCurrency: bindActionCreators(setCurrency, dispatch)
  })
)
export default class CurrencySelect extends Component {
  componentDidMount() {
    this.props.getRates()
  }

  render() {
    return (
      <Select
        showSearch
        className='currency-dropdown'
        size='small'
        dropdownMatchSelectWidth={false}
        value={this.props.currency.get('currency')}
        onSelect={this.props.setCurrency}
        filterOption={(currency, option) => option.props.value.toLowerCase().indexOf(currency.toLowerCase()) >= 0}
      >
        {
          this
            .props.currency.getIn(['exchangeRates', 'rates'])
            .keySeq()
            .map(rate => <Option key={rate} value={rate}>{rate}</Option>)
        }
      </Select>
    )
  }
}
