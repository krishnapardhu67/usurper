
import React from 'react'
import PropTypes from 'prop-types'
import SearchOptionList from '../SearchOptionList'
import '../../../static/css/global.css'
import '../../../static/css/search.css'

const SearchBox = (props) => {
  return (
    <span
      className='uSearchBox'
      style={{ display: props.visible ? 'grid' : 'none' }}>
      <label>
        <ul id='searchAction'
          aria-haspopup='true'
          aria-expanded={props.search.searchBoxOpen}>
          <li
            id='selected-search'
            onClick={props.onClick}
            onKeyDown={props.onKeyDown}
            tabIndex='0'>
            <span
              className='screen-reader-only'
              id='label-for-current-search-selector'
            >Select a search option. Your current search option is</span>
            <p
              className='current-search'
              aria-labelledby='label-for-current-search-selector'
            >{ props.currentSearch.title}</p>
          </li>
          <SearchOptionList {...props} />
        </ul>
      </label>
      <div className='input'>
        <span
          className='screen-reader-only'
          id='label-for-basic-search-field'
        >Search in { props.currentSearch.title }</span>
        <input
          id='basic-search-field'
          role='searchbox'
          name='q'
          defaultValue={props.defaultSearch}
          onChange={props.onChange}
          aria-labelledby='label-for-basic-search-field' />
      </div>
      <button onClick={props.onSubmit}>Search</button>
    </span>
  )
}

SearchBox.propTypes = {
  currentSearch: PropTypes.object.isRequired,
  defaultSearch: PropTypes.string,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  search: PropTypes.shape({
    searchBoxOpen: PropTypes.bool,
  }),
  visible: PropTypes.bool,
}

export default SearchBox
