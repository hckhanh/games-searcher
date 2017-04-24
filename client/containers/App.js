import { Col, Icon, Layout, Menu, Row } from 'antd'
import React, { Component } from 'react'
import { Link } from 'react-router'
import CurrencySelect from '../component/CurrencySelect'
import SearchGameForm from '../component/SearchGameForm'
const { Header, Footer, Content } = Layout
const MenuItem = Menu.Item

export default class App extends Component {
  handleOnMenuClick = ({ key }) => {
    if (key === 'share') {
      FB.ui({
        method: 'share',
        href  : location.href
      }, function (response) {})
    }
  }

  generateMenu = () => {
    return (
      <Menu
        className='top-menu-right'
        theme='dark'
        mode='horizontal'
        onClick={this.handleOnMenuClick}
      >
        <MenuItem key='share'>
          <Icon type="like" />
          <span className='menu-text'>Share on Facebook</span>
        </MenuItem>
        <MenuItem key='donate'>
          <a href='https://paypal.me/hckhanh/5' target='_blank'>
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
