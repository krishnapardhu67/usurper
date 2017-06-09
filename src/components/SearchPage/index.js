'use strict'
import { connect } from 'react-redux'
import SearchPage from './presenter.js'

import { fetchResults } from '../../actions/search.js'

const mapStateToProps = (state, ownProps) => {
  console.log('search', state.search)
  return {
    query: state.search.query,
    items: state.search.items,
    searchInformation: state.search.searchInformation,
    queries: state.search.queries,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchResults: (query) => {
      dispatch(fetchResults(query))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage)
