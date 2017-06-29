import { Col, Icon, Layout, Menu, Modal, Row } from 'antd'
import { introJs } from 'intro.js/intro'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import CurrencySelect from '../component/CurrencySelect'
import SearchGameForm from '../component/SearchGameForm'
const { Header, Footer, Content } = Layout
const MenuItem = Menu.Item

@connect(
  state => ({
    loading: state.app.get('loading'),
    hasPrices: state.home.get('hasPrices')
  })
)
export default class App extends Component {
  componentDidUpdate() {
    if (!localStorage.getItem('showHints') && this.props.hasPrices) {
      setTimeout(() => {
        Modal.confirm({
          title: 'First time visitor',
          content: 'Welcome to my little demo project. Do you need a little help?',
          onOk: () => {
            localStorage.setItem('showHints', true)
            scroll(0, 0)
            this.showHints()
          },
          onCancel: () => {
            localStorage.setItem('showHints', true)
          },
          okText: 'Show me',
          cancelText: 'Skip'
        })
      }, 2000)
    }
  }

  showHints = () => {
    const intro = introJs()

    intro.setOptions({
      steps: [
        {
          element: '.game-search',
          intro: 'Enter <strong>games</strong> to search here.'
        },
        {
          element: '.currency-dropdown',
          intro: 'Select <strong>currency</strong> you want to apply to all prices bellow.',
          position: 'bottom-right-aligned'
        }
      ]
    })

    intro.start()
  }

  handleOnMenuClick = ({ key }) => {
    if (key === 'share') {
      FB.ui({
        method: 'share',
        href: location.href
      }, function(response) {})
    }
  }

  generateMenu = () => {
    return (
      <Menu
        className='top-menu-right'
        theme='dark'
        mode='horizontal'
        selectable={false}
        onClick={this.handleOnMenuClick}
      >
        <MenuItem key='share'>
          <Icon type="like" />
          <span className='menu-text'>Share on Facebook</span>
        </MenuItem>
        <MenuItem key='donate'>
          <a href='https://paypal.me/hckhanh/10' target='_blank'>
            <Icon type="heart" />
            <span className='menu-text'>Buy me a coffee</span>
          </a>
        </MenuItem>
        <MenuItem key='github'>
          <a href='https://github.com/hckhanh/games-searcher' target='_blank'>
            <Icon type="github" />
            <span className='menu-text'>GitHub</span>
          </a>
        </MenuItem>
      </Menu>
    )
  }

  generateMainHeader = () => {
    return (
      <Header className='main-header'>
        <div className='header-content'>
          <Row gutter={16}>
            <Col xs={24} sm={12} md={6} lg={5}>
              <Link className='logo' to='/'>
                <div className='logo-icon' />
                <div className='logo-title'>{process.env.APP_TITLE}</div>
              </Link>
            </Col>
            <Col xs={24} sm={12} md={6} lg={7}>
              <SearchGameForm />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <div className='right-items'>
                {this.generateMenu()}
                <CurrencySelect />
              </div>
            </Col>
          </Row>
        </div>
      </Header>
    )
  }

  render() {
    const { loading } = this.props

    return (
      <Layout>
        {this.generateMainHeader()}
        <Content className={loading && 'loading'}>
          <div className='main-content'>
            {this.props.children}
          </div>
        </Content>
        {
          !loading && (
            <Footer className='main-footer'>
              Made with <Icon type="heart" /> by <a href='https://github.com/hckhanh' target='_blank'>@hckhanh</a>
            </Footer>
          )
        }
      </Layout>
    )
  }
}
