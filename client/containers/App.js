import { Button, Col, Icon, Layout, Menu, Row, Select } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { getRates, getSuggestions, setCurrency } from '../actions/app'
const { Header, Footer, Content } = Layout
const Option = Select.Option

@connect(
  state => ({
    app: state.app
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

  generateDataSource = () => {
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
    const currency = this.props.app.get('currency')
    return (
      <Layout>
        <Header className='sub-header'>
          <div className='header-content'>
            <Select
              showSearch
              className='currency-dropdown'
              size='small'
              dropdownMatchSelectWidth={false}
              value={currency}
              defaultValue={currency}
              onSelect={(currency) => this.props.setCurrency(currency.toUpperCase())}
            >
              {
                this.props.app.get('rates')
                    .map(rate => <Option key={rate} value={rate.toLowerCase()}>{rate}</Option>)
              }
            </Select>
          </div>
        </Header>
        <Header className='main-header'>
          <div className='header-content'>
            <Row>
              <Col span={5}>
                <Link to='/'>
                  <div className='logo-icon' />
                  <div className='logo-title'>Game Searcher</div>
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
                  {this.generateDataSource()}
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
