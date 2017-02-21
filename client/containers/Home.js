import { Card, Col, Row, Tag } from 'antd'
import React, { Component } from 'react'

export default class Home extends Component {
  render() {
    return (
      <Row gutter={16}>
      <Col span='8'>
        <Card bodyStyle={{ padding: 0 }}>
          <div className="custom-image">
            <img alt="example"
                 width='100%'
                 src="http://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg?t=1486407127" />
          </div>
          <div className="custom-card" style={{ padding: '10px 16px' }}>
            <h3 style={{ display: 'inline-block' }}>Free to Play</h3>
            <Tag style={{ float: 'right' }} color="red-inverse">Hot</Tag>
          </div>
        </Card>
      </Col>
      <Col span='8'>
        <Card bodyStyle={{ padding: 0 }}>
          <div className="custom-image">
            <img alt="example"
                 width='100%'
                 src="http://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg?t=1486407127" />
          </div>
          <div className="custom-card" style={{ padding: '10px 16px' }}>
            <h3 style={{ display: 'inline-block' }}>Free to Play</h3>
            <Tag style={{ float: 'right' }} color="red-inverse">Hot</Tag>
          </div>
        </Card>
      </Col>
      <Col span='8'>
        <Card bodyStyle={{ padding: 0 }}>
          <div className="custom-image">
            <img alt="example"
                 width='100%'
                 src="http://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg?t=1486407127" />
          </div>
          <div className="custom-card" style={{ padding: '10px 16px' }}>
            <h3 style={{ display: 'inline-block' }}>Free to Play</h3>
            <Tag style={{ float: 'right' }} color="red-inverse">Hot</Tag>
          </div>
        </Card>
      </Col>
        {/*<Col span='6'>*/}
        {/*<Card bodyStyle={{ padding: 0 }}>*/}
        {/*<div className="custom-image">*/}
        {/*<img alt="example" width='100%' src="http://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg?t=1486407127" />*/}
        {/*</div>*/}
        {/*<div className="custom-card" style={{ padding: '10px 16px'}}>*/}
        {/*<h3 style={{ display: 'inline-block'}}>Free to Play</h3>*/}
        {/*<Tag style={{ float: 'right'}} color="red-inverse">Hot</Tag>*/}
        {/*</div>*/}
        {/*</Card>*/}
        {/*</Col>*/}
    </Row>
    )
  }
}
