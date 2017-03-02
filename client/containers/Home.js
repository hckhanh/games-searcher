import { Card, Col, Icon, Row, Spin } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPrices, getTopGames, searchGames } from '../actions/home'
import Currency from '../component/Currency'

@connect(
  state => ({
    app : state.app,
    home: state.home
  }),
  dispatch => ({
    getTopGames: bindActionCreators(getTopGames, dispatch),
    getPrices  : bindActionCreators(getPrices, dispatch),
    searchGames: bindActionCreators(searchGames, dispatch)
  })
)
export default class Home extends Component {
  componentDidMount() {
    const name = this.props.location.query.name
    if (name) {
      this.props.searchGames(name)
    } else {
      this.props.getTopGames()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.home.get('hasPrices')) {
      nextProps.getPrices()
    }

    const name = nextProps.location.query.name
    if (this.props.location.query.name !== name) {
      if (name) {
        nextProps.searchGames(name)
      } else {
        this.props.getTopGames()
      }
    }
  }

  generatePriceBlock = (discountPercent, oldPrice, newPrice) => {
    if (discountPercent === 0) {
      return (
        <div className='prices-block'>
          <div className='price'>
            <Currency price={newPrice} />
          </div>
        </div>
      )
    } else if (discountPercent > 0) {
      return (
        <div className='prices-block'>
          <div className='discount-percent'>{-discountPercent}%</div>
          <div className='prices'>
            <div className='old-price'>
              <Currency price={oldPrice} />
            </div>
            <div className='new-price'>
              <Currency price={newPrice} />
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className='prices-block'>
          <div className='free-tag'>Free</div>
        </div>
      )
    }
  }

  render() {
    const column = 4

    return (
      <div>
        <Spin className='spin-loading' spinning={this.props.app.get('loading')} tip='Patient is good for you' />
        {
          this
            .props.home.get('games')
            .groupBy((game, key) => ~~(key / column))
            .valueSeq()
            .map((games, key) => (
              <Row key={key} gutter={16} style={{ paddingTop: 8, paddingBottom: 8 }}>
                {
                  games.map((game) => {
                    const platforms = game.get('platforms')
                    const loading = !game.get('is_free') && !this.props.home.get('hasPrices')

                    let discountPercent, newPrice, oldPrice, url
                    if (game.has('itad_price')) {
                      discountPercent = game.getIn(['itad_price', 'price_cut'])
                      oldPrice = game.getIn(['itad_price', 'price_old'])
                      newPrice = game.getIn(['itad_price', 'price_new'])
                      url = game.getIn(['itad_price', 'url'])
                    } else {
                      discountPercent = game.getIn(['steam_price', 'discount_percent'])
                      oldPrice = game.getIn(['steam_price', 'initial']) / 100
                      newPrice = game.getIn(['steam_price', 'final']) / 100
                      url = `http://store.steampowered.com/app/${game.get('app_id')}`
                    }

                    return (
                      <Col key={game.get('app_id')} span={24 / column}>
                        <Card bodyStyle={{ padding: 0 }}
                              loading={loading}>
                          <a href={url} target='_blank'>
                            <img alt={game.get('name')} width='100%' src={game.get('header_image')} />
                            <div className='card-game-content'>
                              {
                                <div className='platforms'>
                                  {
                                    game.getIn(['platforms', 'windows']) &&
                                    <Icon className='platform-icon' type='windows' />
                                  }
                                  {game.getIn(['platforms', 'mac']) && <Icon className='platform-icon' type='apple' />}
                                </div>
                              }
                              {this.generatePriceBlock(discountPercent, oldPrice, newPrice)}
                            </div>
                          </a>
                        </Card>
                      </Col>
                    )
                  })
                }
              </Row>
            ))
        }
      </div>
    )
  }
}
