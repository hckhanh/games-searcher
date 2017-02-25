import { Button, Col, Icon, Layout, Menu, Row, Select } from 'antd'
import { List } from 'immutable'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { getSuggestions } from '../actions/app'
const { Header, Footer, Content } = Layout
const Option = Select.Option

@connect(
  state => ({
    app: state.app
  }),
  dispatch => ({
    getSuggestions: bindActionCreators(getSuggestions, dispatch)
  })
)
export default class App extends Component {
  state = {
    suggestions: List()
  }

  componentWillReceiveProps(nextProps) {
    const suggestions = nextProps.app.get('suggestions')
    if (this.props.app.get('suggestions') !== suggestions) {
      this.setState({ suggestions })
    }
  }

  handleOnSearchGame = (name) => {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout)
    }

    this.searchTimeout = setTimeout(() => this.props.getSuggestions(name), 500)
  }

  generateDataSource = () => {
    return this.state.suggestions.map((game, key) => {
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
        <Header className='sub-header'>
          <Select className='currency-dropdown' size='small' defaultValue='USD'>
            <Option value='USD'>USD</Option>
            <Option value='VND'>VND</Option>
          </Select>
        </Header>
        <Header className='main-header'>
          <Row >
            <Col span={5}>
              <div className='logo-icon' />
              <div className='logo-title'>Game Searcher</div>
            </Col>
            <Col span={10}>
              <Select
                combobox
                showSearch
                className='game-search'
                size='large'
                placeholder='Find a game'
                notFoundContent='No result'
                showArrow={false}
                filterOption={false}
                onSearch={this.handleOnSearchGame}
              >
                {this.generateDataSource()}
              </Select>
              <Button className='search-btn' size='large' type='primary'>
                <Icon type='search' />
              </Button>
            </Col>
            <Col span={9}>
              <Menu
                className='top-menu-right'
                theme='dark'
                mode='horizontal'
              >
                <Menu.Item key='1'>
                  <a href='https://github.com/hckhanh/games-searcher' target='_blank'>
                    <Icon type="github" />
                    GitHub
                  </a>
                </Menu.Item>
              </Menu>
            </Col>
          </Row>
        </Header>
        <Content style={{ padding: '24px 50px 0 50px' }}>
          {/*<Breadcrumb style={{ margin: '12px 0' }}>*/}
          {/*<Breadcrumb.Item>Home</Breadcrumb.Item>*/}
          {/*<Breadcrumb.Item>Lords Of The Fallen Digital Deluxe</Breadcrumb.Item>*/}
          {/*</Breadcrumb>*/}
          <div className='main-content'>
            {this.props.children}
          </div>
        </Content>
        <Footer className='main-footer'>
          A tool to search games information including best prices
        </Footer>
      </Layout>
    )
  }
}
