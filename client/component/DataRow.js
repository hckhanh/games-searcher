import { Tooltip } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'

const DataRow = ({ label, value, children, space }) => {
  let textValue = value
  if (value && value.length > 24) {
    textValue = <Tooltip placement="bottom" title={value}>{value}</Tooltip>
  }

  return (
    <div className='data'>
      <span className='data-label' style={{ marginRight: space ? space : 0 }}>{label}&nbsp;</span>
      <span className='data-value'>{textValue ? textValue : children}</span>
    </div>
  )
}

DataRow.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.object,
  space: PropTypes.number
}

export default DataRow
