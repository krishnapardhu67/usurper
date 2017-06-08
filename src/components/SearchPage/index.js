'use strict'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import fetch from 'isomorphic-fetch'
import SearchResultInfo from './SearchResultInfo'
import SearchResults from './SearchResults'
import SearchPager from './SearchPager'

class SearchPage extends Component {
  constructor (props) {
    super(props)
    this.key = 'AIzaSyDxN0OmGofQqHr7d6CrT6DzJ-4-498_BaE'
    this.cx = '014724449652618811936:oztyn9vo9f8'

    const query = this.props.location.pathname.replace('/search/', '')
    const displayQuery = query.replace(/(&start=\d+)/, '')

    this.state = {
      query: query,
      displayQuery: displayQuery,
      items: [],
      searchInformation: {
        totalResults: 0,
      },
      queries: {},
    }
    this.fetchResults = this.fetchResults.bind(this)
  }

  fetchResults (query) {
    return fetch(
      'https://www.googleapis.com/customsearch/v1?key=' + this.key +
      '&cx=' + this.cx +
      '&q=' + query
    )
      .then(response => response.json())
      .then(json => {
        this.setState({
          items: json.items,
          searchInformation: json.searchInformation,
          queries: json.queries,
        })
      })
  }

  componentWillMount () {
    this.fetchResults(this.state.query)
  }

  componentWillReceiveProps (nextProps) {
    this.fetchResults(nextProps.location.pathname.replace('/search/', ''))
  }

  render () {
    return (
      <div className='search-results'>
        <h1>Search Results for <i>'{this.state.displayQuery}'</i></h1>
        <SearchResultInfo searchInformation={this.state.searchInformation} />
        <SearchResults items={this.state.items} />
        <SearchPager
          queries={this.state.queries}
          searchInformation={this.state.searchInformation}
          displayQuery={this.state.displayQuery}
        />
      </div>
    )
  }
}

export default SearchPage
