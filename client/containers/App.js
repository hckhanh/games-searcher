import { AutoComplete, Button, Col, Icon, Input, Layout, Menu, Row, Select } from 'antd'
import React, { Component } from 'react'
const Option = Select.Option
const { Header, Footer, Content } = Layout

export default class App extends Component {
  render() {
    return (
      <Layout>
        <Header className='sub-header'>
          <Select className='currency-dropdown' size='small' defaultValue='lucy'>
            <Option value='jack'>VND</Option>
            <Option value='lucy'>USD</Option>
          </Select>
        </Header>
        <Header className='main-header'>
          <Row >
            <Col span={7}>
              <div className='logo-icon' />
              <div className='logo-title'>Game Searcher</div>
            </Col>
            <Col span={10}>
              <AutoComplete
                className='game-search'
                size='large'
                dataSource={['Game 1', 'Game 2', 'Game 3']}
                placeholder='Find a game'
                optionLabelProp='text'
              >
                <Input
                  suffix={(
                    <Button className='search-btn' size='large' type='primary'>
                      <Icon type='search' />
                    </Button>
                  )}
                />
              </AutoComplete>
            </Col>
            <Col span={7}>
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
        <Footer style={{ textAlign: 'center' }}>
          A tool to search games information including best prices
        </Footer>
      </Layout>
    )
  }
}
