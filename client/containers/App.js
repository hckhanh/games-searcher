import { Button, Icon, Layout, Menu, Select } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { getSuggestions } from '../actions/app'
import { getRates, setCurrency } from '../actions/currency'
const { Header, Footer, Content } = Layout
const Option = Select.Option

@connect(
  state => ({
    app     : state.app,
    currency: state.currency
  }),
  dispatch => ({
    getSuggestions: bindActionCreators(getSuggestions, dispatch),
    getRates      : bindActionCreators(getRates, dispatch),
    setCurrency   : bindActionCreators(setCurrency, dispatch)
  })
)
export default class App extends Component {
  state = {
    currentName: null
  }

  componentDidMount() {
    this.props.getRates()
  }

  handleOnSuggestGames = (name) => {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout)
    }

    this.searchTimeout = setTimeout(() => this.props.getSuggestions(name), 500)
    this.setState({ currentName: name })
  }

  handleOnSearchGames = (name) => {
    if (name) {
      this.props.router.push(`?name=${encodeURIComponent(name)}`)
    }
  }

  handleOnMenuClick = ({ key }) => {
    if (key === 'share') {
      FB.ui({
        method: 'share',
        href  : location.href
      }, function (response) {})
    }
  }

  generateMainHeader = () => {
    return (
      <Header className='main-header'>
        <div className='header-content'>
          <Link className='logo' to='/'>
            <div className='logo-icon' />
            <div className='logo-title'>{process.env.APP_TITLE}</div>
          </Link>
          <div className='search'>
            <Select
              className='game-search'
              combobox
              showSearch
              allowClear
              size='large'
              placeholder='Find a game'
              notFoundContent='No result'
              dropdownMatchSelectWidth={false}
              showArrow={false}
              filterOption={false}
              onSearch={this.handleOnSuggestGames}
              onSelect={this.handleOnSearchGames}
            >
              {this.generateGameData()}
            </Select>
            <Button
              className='search-btn'
              size='large'
              type='primary'
              onClick={() => this.handleOnSearchGames(this.state.currentName)}
            >
              <Icon type='search' />
            </Button>
          </div>
          <div className='right-items'>
            <Menu
              className='top-menu-right'
              theme='dark'
              mode='horizontal'
              onClick={this.handleOnMenuClick}
            >
              <Menu.Item key='share'>
                <Icon type="like" />
                Share on Facebook
              </Menu.Item>
              <Menu.Item key='donate'>
                <a href='https://paypal.me/hckhanh/5' target='_blank'>
                  <Icon type="heart" />
                  Donate
                </a>
              </Menu.Item>
              <Menu.Item key='github'>
                <a href='https://github.com/hckhanh/games-searcher' target='_blank'>
                  <Icon type="github" />
                  GitHub
                </a>
              </Menu.Item>
            </Menu>
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
          </div>
        </div>
      </Header>
    )
  }

  generateGameData = () => {
    return this
      .props.app.get('suggestions')
      .map((game, key) => {
        const name = game.get('name')
        return (
          <Option className='suggestions' key={key} value={name}>
            <Link to={`?name=${encodeURIComponent(name)}`}>
              <div>
                <img alt={name} width='120px' src={game.get('tiny_image')} />
                <div className='title'>{name}</div>
              </div>
            </Link>
          </Option>
        )
      })
  }

  render() {
    return (
      <Layout>
        {this.generateMainHeader()}
        <Content>
          <div className='main-content'>
            {this.props.children}
          </div>
        </Content>
        <Footer className='main-footer'>
          Made with <Icon type="heart" /> by <a href='https://github.com/hckhanh' target='_blank'>@hckhanh</a>
        </Footer>
      </Layout>
    )
  }
}
