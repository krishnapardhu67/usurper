import React from 'react'
import PropTypes from 'prop-types'

const SearchResultInfo = (props) => {
  if (props.searchInformation && props.searchInformation.totalResults > 0) {
    return (
      <div className='search-result-info'>About {props.searchInformation.totalResults} results ({props.searchInformation.formattedSearchTime}  seconds)</div>
    )
  }
  return null
}

export default SearchResultInfo
