import { Map } from 'immutable'

const INITIAL_STATE = Map({
  number: null
})

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'UPDATE_DATA':
      return state.set('number', action.number)
    default:
      return state
  }
}
