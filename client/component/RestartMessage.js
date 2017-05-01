import React, { Component } from 'react'

const RestartMessage = () => (
  <span>
    Data cannot be loaded completely, please try again later or <a onClick={() => location.reload(true)}>refresh</a>
  </span>
)

export default RestartMessage
