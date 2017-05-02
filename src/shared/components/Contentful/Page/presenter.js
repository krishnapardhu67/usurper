// Presenter component for a Page content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import { Link } from 'react-router-dom'
import LibMarkdown from '../../LibMarkdown'

const Loading = (
  <span>loading</span>
)
const Loaded = (cfPageEntry) => (
  <div className={'ContentfulPage'}>
    <div>{ cfPageEntry.fields.url }</div>
    <h1>{ cfPageEntry.fields.title }</h1>
    <LibMarkdown className='testName'>{ cfPageEntry.fields.shortContent }</LibMarkdown>
    <div><Link to={ '/' }>Home</Link></div>
  </div>
)
const ErrorLoading = (
  <span>Error</span>
)

const NotFound = (
  <div className={'NotFound'}>
    <h1>Page Not Found</h1>
    <div>The requested page could not be found</div>
  </div>
)

const Presenter = ({ cfPageEntry }) => {
  if (cfPageEntry.isFetching) {
    return Loading
  }
  if (cfPageEntry.status === 'success') {
    return Loaded(cfPageEntry.json)
  } else if (cfPageEntry.status === 'not found') {
    return NotFound
  } else {
    return ErrorLoading
  }
}

Presenter.propTypes = {
  cfPageEntry: PropTypes.object.isRequired
}

export default Presenter