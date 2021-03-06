import { Card, Col, Icon, Row, Spin, Tooltip } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { getPrices, getTopGames, searchGames } from '../actions/home'
import Currency from '../component/Currency'
import { createLoadingSelector } from '../reducers/loading'
import { calculateDiscount } from '../utils'

const loadingSelector = createLoadingSelector('LOAD_APP')
const pricesLoadingSelector = createLoadingSelector('GET_PRICES')

@connect(
  state => ({
    loading: loadingSelector(state),
    home: state.home,
    hasPrices: !pricesLoadingSelector(state)
  }),
  dispatch => ({
    getTopGames: bindActionCreators(getTopGames, dispatch),
    getPrices: bindActionCreators(getPrices, dispatch),
    searchGames: bindActionCreators(searchGames, dispatch)
  })
)
export default class Home extends Component {
  generatePriceBlock = (discountPercent, oldPrice, newPrice, fromCurrency) => {
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
              <Currency price={oldPrice} fromCurrency={fromCurrency} />
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

  componentDidMount() {
    const name = this.props.location.query.name
    if (name) {
      this.props.searchGames(name)
    } else {
      this.props.getTopGames()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.hasPrices) {
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

  render() {
    const column = 4
    const { home, hasPrices } = this.props

    return (
      <div className='games-list'>
        <Spin className='spin-loading' spinning={this.props.loading} tip='Loading...' />
        {
          home
            .get('games')
            .groupBy((game, key) => ~~(key / column))
            .valueSeq()
            .map((games, key) => (
              <Row key={key} gutter={16}>
                {
                  games.map((game) => {
                    const loading = !game.get('is_free') && !hasPrices

                    let newPrice
                    if (game.has('itad_price')) {
                      newPrice = game.getIn(['itad_price', 'price_new'])
                    } else {
                      newPrice = game.getIn(['steam_price', 'final']) / 100
                    }

                    const oldPrice = game.getIn(['steam_price', 'initial']) / 100
                    const discountPercent = calculateDiscount(oldPrice, newPrice)
                    const fromCurrency = game.getIn(['steam_price', 'currency'])
                    const platform = game.get('platforms')
                    const shortDescription = game.get('short_description') &&
                      <div dangerouslySetInnerHTML={{ __html: game.get('short_description') }} />

                    return (
                      <Col className='game-item' key={game.get('app_id')} xs={24} sm={24} md={6} lg={6}>
                        <Tooltip placement="rightTop" title={shortDescription}>
                          <Card bodyStyle={{ padding: 0 }} loading={loading}>
                            <Link to={game.get('app_id').toString()}>
                              <img alt={game.get('name')} width='100%' src={game.get('header_image')} />
                              <div className='card-game-content'>
                                {
                                  <div className='platforms'>
                                    {platform.get('windows') && <Icon className='platform-icon' type='windows' />}
                                    {platform.get('mac') && <Icon className='platform-icon' type='apple' />}
                                  </div>
                                }
                                {this.generatePriceBlock(discountPercent, oldPrice, newPrice, fromCurrency)}
                              </div>
                            </Link>
                          </Card>
                        </Tooltip>
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
