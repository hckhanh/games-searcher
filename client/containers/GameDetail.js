import { Button, Col, Icon, Modal, Row, Spin, Table, Tabs } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getGameDetail, getGamePrices, resetGameDetail } from '../actions/games'
import Currency from '../component/Currency'
import DataRow from '../component/DataRow'
import Section from '../component/Section'
import { createLoadingSelector } from '../reducers/loading'

const TabPane = Tabs.TabPane
const { Column } = Table
const gameLoadingSelector = createLoadingSelector('GET_GAME_DETAIL')
const pricesLoadingSelector = createLoadingSelector('GET_GAME_PRICES')

@connect(
  state => ({
    games: state.games,
    gameLoading: gameLoadingSelector(state),
    pricesLoading: pricesLoadingSelector(state)
  }),
  dispatch => ({
    getGameDetail: bindActionCreators(getGameDetail, dispatch),
    getGamePrices: bindActionCreators(getGamePrices, dispatch),
    resetGameDetail: bindActionCreators(resetGameDetail, dispatch)
  })
)
export default class GameDetails extends Component {
  showModal = () => {
    this.setState({
      visible: true
    })
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }

  goNextImage = () => {
    const imageIndex = this.state.imageIndex + 1
    this.setState({ imageIndex })
  }

  goBackImage = () => {
    const imageIndex = this.state.imageIndex - 1
    this.setState({ imageIndex })
  }

  generatePricesTable = (gameDetail, games) => {
    const gamePrices = games.get('gamePrices').toJS()

    if (!gameDetail.get('is_free')) {
      const linkStore = (store, record) => <a href={record.url} target='_blank'>{store}</a>
      const formattedPrice = (price) => <Currency price={price} />

      return (
        <Table className='data-block' loading={this.props.pricesLoading} rowKey='key' dataSource={gamePrices}
               pagination={{ pageSize: 7 }}>
          <Column className='game-store' key='store' title='Store' dataIndex='shop.name' render={linkStore} />
          <Column className='game-price' key='price' title='Price' dataIndex='price_new' render={formattedPrice} />
        </Table>
      )
    } else {
      return null
    }
  }

  generateGameDetail = (games) => {
    const { imageIndex } = this.state
    const screenshots = games.getIn(['gameDetail', 'screenshots'])
    const gameDetail = games.get('gameDetail')

    return (
      <div className='game-details'>
        <h2 className='game-title'>{gameDetail.get('name')}</h2>
        <Row gutter={14}>
          <Col span={16}>
            {
              gameDetail.has('screenshots') &&
              <img className='clickable-image' src={gameDetail.getIn(['screenshots', 0, 'path_thumbnail'])}
                   onClick={this.showModal} />
            }
            <Section title='Description' classNameContent='justify-content'>
              <div dangerouslySetInnerHTML={{ __html: gameDetail.get('detailed_description') }} />
            </Section>
            <Section title='Supported Languages'>
              <div className='justify-content'
                   dangerouslySetInnerHTML={{ __html: gameDetail.get('supported_languages') }} />
            </Section>
            <Section title='System Requirements'>
              <Tabs defaultActiveKey="1">
                {
                  gameDetail.getIn(['platforms', 'windows']) &&
                  <TabPane tab={<span><Icon type="windows" />Windows</span>} key="1">
                    <span dangerouslySetInnerHTML={{ __html: gameDetail.getIn(['pc_requirements', 'minimum']) }} />
                  </TabPane>
                }
                {
                  gameDetail.getIn(['platforms', 'mac']) &&
                  <TabPane tab={<span><Icon type="apple" />Mac OS X</span>} key="2">
                    <span dangerouslySetInnerHTML={{ __html: gameDetail.getIn(['mac_requirements', 'minimum']) }} />
                  </TabPane>
                }
                {
                  gameDetail.getIn(['platforms', 'linux']) &&
                  <TabPane tab={<span><Icon type="linux" />Linux</span>} key="3">
                    <span dangerouslySetInnerHTML={{ __html: gameDetail.getIn(['linux_requirements', 'minimum']) }} />
                  </TabPane>
                }
              </Tabs>
            </Section>
          </Col>
          <Col span={8}>
            <div className='data-block'>
              <img width='100%' src={gameDetail.get('header_image')} />
              <DataRow label='Developers:' space={29}
                       value={gameDetail.get('developers') && gameDetail.get('developers').join(', ')} />
              <DataRow label='Publishers:' space={33}
                       value={gameDetail.get('publishers') && gameDetail.get('publishers').join(', ')} />
              <DataRow label='Release Date:' space={20}
                       value={gameDetail.get('release_date') && gameDetail.getIn(['release_date', 'date'])} />
              <DataRow label='Website:' space={55}>
                <a href={gameDetail.get('website')} target='_blank'>{gameDetail.get('website')}</a>
              </DataRow>
            </div>
            {this.generatePricesTable(gameDetail, games)}
          </Col>
        </Row>
        <Modal
          width={830}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" size="large" disabled={imageIndex === 0} onClick={this.goBackImage}>Back</Button>,
            <Button key="next" size="large" type='primary' disabled={screenshots && imageIndex === screenshots.size - 1}
                    onClick={this.goNextImage}>Next</Button>
          ]}
        >
          <img width={800} src={gameDetail.getIn(['screenshots', imageIndex, 'path_full'])} />
        </Modal>
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.state = { visible: false, loading: false, imageIndex: 0 }
  }

  componentDidMount() {
    const { params, getGameDetail, getGamePrices } = this.props

    getGameDetail(params.appId)
    getGamePrices(params.appId)
  }

  componentWillUnmount() {
    this.props.resetGameDetail()
  }

  render() {
    const { games, gameLoading } = this.props
    if (gameLoading) {
      return <Spin className='spin-loading' spinning={true} tip='Loading detail...' />
    } else {
      return this.generateGameDetail(games)
    }
  }
}
