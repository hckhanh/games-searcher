import { Button, Icon, Select } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { getSuggestions } from '../actions/app'
const SelectOption = Select.Option

@connect(
  state => ({
    suggestions: state.app.get('suggestions')
  }),
  dispatch => ({
    getSuggestions: bindActionCreators(getSuggestions, dispatch)
  })
)
export default class SearchGameForm extends Component {
  state = {
    currentName: null
  }

  handleOnSuggestGames = (name) => {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout)
    }

    this.searchTimeout = setTimeout(() => this.props.getSuggestions(name), 500)
    this.setState({ currentName: name })
  }

  handleOnSearchGames = (name) => {
    if (name) {
      browserHistory.push(`?name=${encodeURIComponent(name)}`)
    }
  }

  generateGameData = () => {
    return this
      .props.suggestions
      .map((game, key) => {
        const name = game.get('name')
        return (
          <SelectOption className='suggestions' key={key} value={name}>
            <Link to={`?name=${encodeURIComponent(name)}`}>
              <div>
                <img alt={name} width='120px' src={game.get('tiny_image')} />
                <div className='title'>{name}</div>
              </div>
            </Link>
          </SelectOption>
        )
      })
  }

  handleSubmitSearch = (e) => {
    e.preventDefault()
    this.handleOnSearchGames(this.state.currentName)
  }

  render() {
    return (
      <form className='search' onSubmit={this.handleSubmitSearch}>
        <Select
          className='game-search'
          showSearch
          size='large'
          placeholder='Find a game'
          notFoundContent='No result'
          mode='combobox'
          showArrow={false}
          filterOption={false}
          dropdownMatchSelectWidth={false}
          defaultActiveFirstOption={false}
          onSearch={this.handleOnSuggestGames}
          onSelect={this.handleOnSearchGames}
        >
          {this.generateGameData()}
        </Select>
        <Button className='search-btn' size='large' type='primary' htmlType='submit'>
          <Icon type='search' />
        </Button>
      </form>
    )
  }
}
