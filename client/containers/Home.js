import { Card, Col, Row } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getTopGames } from '../actions/home'

@connect(
  state => ({
    home: state.home
  }),
  dispatch => ({
    getTopGames: bindActionCreators(getTopGames, dispatch)
  })
)
export default class Home extends Component {
  componentDidMount() {
    this.props.getTopGames()
  }

  render() {
    const column = 4

    return (
      <div>
        {
          this
            .props.home.get('topGames')
            .groupBy((game, key) => ~~(key / column))
            .valueSeq()
            .map((games, key) => (
              <Row key={key} gutter={16} style={{ paddingTop: 8, paddingBottom: 8 }}>
                {
                  games.map((game, key) => (
                    <Col key={key} span={24 / column}>
                      <Card bodyStyle={{ padding: 0 }}>
                        <div>
                          <img alt="example" width='100%' src={game.get('headerImage')} />
                        </div>
                        <div className='card-game-content'>
                          {
                            <div className='platforms'>
                              {game.get('pc') && <div className='pc-icon' />}
                              {game.get('mac') && <div className='mac-icon' />}
                              {game.get('linux') && <div className='linux-icon' />}
                            </div>
                          }
                          <div className='prices-block'>
                            <div className='discount-percent'>70%</div>
                            <div className='prices'>
                              <div className='old-price'>$15.99</div>
                              <div className='new-price'>$9.99</div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))
                }
              </Row>
            ))
        }
      </div>
    )
  }
}
