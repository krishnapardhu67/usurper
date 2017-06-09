import React from 'react'
import PropTypes from 'prop-types'
import Link from '../../Link'

const SearchPager = (props) => {
  const queries = props.queries
  const pagerQuery = props.pagerQuery

  if (queries && queries.request && queries.request[0].totalResults) {
    const resultCount = queries.request[0].totalResults
    const pageCount = 10
    const startIndex = queries.request[0].startIndex
    const length = Math.ceil(resultCount / pageCount)

    let pager = []
    if (queries.previousPage) {
      pager.push(
        <span key='0'>
          <Link to={pagerQuery + '&start=' + queries.previousPage[0].startIndex}>Previous</Link> </span>
      )
    }

    for (let i = 1; i <= length; i++) {
      if (i === Math.ceil(startIndex / pageCount)) {
        pager.push(<span key={i}>{i} </span>)
      } else {
        pager.push(<span key={i}><Link to={pagerQuery + '&start=' + ((i - 1) * pageCount + 1)}>{i}</Link> </span>)
      }
    }

    if (queries.nextPage) {
      pager.push(
        <span key={length + 1}>
          <Link to={pagerQuery + '&start=' + queries.nextPage[0].startIndex}>Next</Link>
        </span>
      )
    }

    return (
      <div>{pager}</div>
    )
  }
  return null
}

SearchPager.propTypes = {
  queries: PropTypes.object,
  displayQuery: PropTypes.string,
}

export default SearchPager
