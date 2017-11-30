import React from 'react'
import PropTypes from 'prop-types'

const FilterBox = (props) => {
  return (
    <div className='filter'>
      <label role='search' aria-label={props.label}>
        <p>{props.title}</p>
        <input
          type='text'
          value={props.value}
          onChange={props.onChange}
          role='search'
          aria-label={props.label}
        />
      </label>
    </div>
  )
}

FilterBox.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
}

FilterBox.defaultProps = {
  value: '',
}

export default FilterBox