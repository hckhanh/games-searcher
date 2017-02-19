import { Card, Col, Row } from 'antd'
import React, { Component } from 'react'

export default class Home extends Component {
  render() {
    return (
      <Row gutter={16}>
      <Col span='4'>
        <Card title='Card title'>Card content</Card>
      </Col>
      <Col span='4'>
        <Card title='Card title'>Card content</Card>
      </Col>
      <Col span='4'>
        <Card title='Card title'>Card content</Card>
      </Col>
      <Col span='4'>
        <Card title='Card title'>Card content</Card>
      </Col>
      <Col span='4'>
        <Card title='Card title'>Card content</Card>
      </Col>
      <Col span='4'>
        <Card title='Card title'>Card content</Card>
      </Col>
    </Row>
    )
  }
}
