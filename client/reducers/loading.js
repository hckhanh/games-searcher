import { Map } from 'immutable'
import React from 'react'

const INITIAL_STATE = Map({})

export default function(state = INITIAL_STATE, action) {
  const { type } = action
  const matches = type.match(/(.*)_(REQUEST|DONE|SUCCESS)/)

  if (!matches) return state

  const [, requestName, status] = matches

  return state.merge({ [requestName]: status === 'REQUEST' })
}

export const createLoadingSelector = (requestName) => (state) => {
  return state.loading.get(requestName, false)
}
