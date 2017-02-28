import { Button, Col, Icon, Layout, Menu, Row, Select } from 'antd'
import React, { Component } from 'react'
import Helmet from 'react-helmet/es/Helmet'
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

  generateSubHeader = (currency) => {
    return (
      <Header className='sub-header'>
        <div className='header-content'>
          <Select
            showSearch
            className='currency-dropdown'
            size='small'
            dropdownMatchSelectWidth={false}
            value={currency}
            onSelect={this.props.setCurrency}
            filterOption={(currency, option) => option.props.value.toLowerCase().indexOf(currency.toLowerCase()) >= 0}
          >
            {
              this.props.currency.getIn(['exchangeRates', 'rates'])
                  .keySeq()
                  .map(rate => <Option key={rate} value={rate}>{rate}</Option>)
            }
          </Select>
        </div>
      </Header>
    )
  }

  generateMainHeader = () => {
    return (
      <Header className='main-header'>
        <div className='header-content'>
          <Row>
            <Col span={5}>
              <Link to='/'>
                <div className='logo-icon' />
                <div className='logo-title'>{process.env.APP_TITLE}</div>
              </Link>
            </Col>
            <Col span={14}>
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
              <Button className='search-btn'
                      size='large'
                      type='primary'
                      onClick={() => this.handleOnSearchGames(this.state.currentName)}>
                <Icon type='search' />
              </Button>
            </Col>
            <Col span={5}>
              <Menu
                className='top-menu-right'
                theme='dark'
                mode='horizontal'
              >
                <Menu.Item key='1'>
                  <a href='https://paypal.me/hckhanh/5' target='_blank'>
                    <Icon type="like" />
                    Donate
                  </a>
                </Menu.Item>
                <Menu.Item key='2'>
                  <a href='https://github.com/hckhanh/games-searcher' target='_blank'>
                    <Icon type="github" />
                    GitHub
                  </a>
                </Menu.Item>
              </Menu>
            </Col>
          </Row>
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

  generateMetaData = () => {
    return [
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { property: 'fb:app_id', content: process.env.FACEBOOK_APP_ID },
      { property: 'og:url', content: location.href },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: process.env.APP_TITLE },
      { property: 'og:site_name', content: process.env.APP_TITLE },
      { property: 'og:description', content: process.env.APP_DESCRIPTION },
      { property: 'og:image', content: process.env.APP_IMAGE }
    ]
  }

  render() {
    const currency = this.props.currency.get('currency')
    return (
      <Layout>
        <Helmet
          title={process.env.APP_TITLE}
          meta={this.generateMetaData()}
        />
        {this.generateSubHeader(currency)}
        {this.generateMainHeader()}
        <Content>
          <div className='main-content'>
            {this.props.children}
          </div>
        </Content>
        <Footer className='main-footer'>
          Made with <Icon type="heart" /> by <a href='https://github.com/hckhanh'>@hckhanh</a>
        </Footer>
      </Layout>
    )
  }
}
