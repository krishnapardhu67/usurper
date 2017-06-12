import React from 'react'
import PropTypes from 'prop-types'
import Link from '../../Link'
import './style.css'

const SearchResult = (props) => {
  const item = props.item
  return (<div>
    <Link to={item.link}><div className='search-result-title'>{item.htmlTitle}</div>
      <div className='search-result-display-link'>{item.displayLink}</div>
      <div className='search-result-snippet'>{item.snippet}</div>
    </Link>
  </div>)
}

export default SearchResult
