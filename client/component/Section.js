import PropTypes from 'prop-types'
import React from 'react'

const Section = ({ title, children, classNameContent }) => (
  <div className='section'>
    <h2 className='section-title'>{title}</h2>
    <span className={classNameContent}>{children}</span>
  </div>
)

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  classNameContent: PropTypes.string
}

export default Section
