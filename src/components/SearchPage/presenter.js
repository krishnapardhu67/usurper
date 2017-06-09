'use strict'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import fetch from 'isomorphic-fetch'
import SearchResultInfo from './SearchResultInfo'
import SearchResults from './SearchResults'
import SearchPager from './SearchPager'

class SearchPage extends Component {
  componentWillMount () {
    const query = window.location.search.replace('?q=', '')
    this.props.fetchResults(query)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.location !== this.props.location) {
      this.props.fetchResults(nextProps.location.search.replace('?q=', ''))
    }
  }

  render () {
    let displayQuery = ''
    let pagerQuery = '/search?q='
    if (this.props.query) {
      displayQuery = this.props.query.replace(/(&start=\d+)/, '')
      pagerQuery += displayQuery
    }

    return (
      <div className='search-results'>
        <h1>Search Results for <i>'{displayQuery}'</i></h1>
        <SearchResultInfo searchInformation={this.props.searchInformation} />
        <SearchResults items={this.props.items} />
        <SearchPager
          queries={this.props.queries}
          pagerQuery={pagerQuery}
        />
      </div>
    )
  }
}

export default SearchPage
