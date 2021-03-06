import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { fetchAllNews } from '../../../actions/contentful/allNews'
import Presenter from './presenter.js'
import PresenterFactory from '../../APIInlinePresenterFactory'
import * as statuses from '../../../constants/APIStatuses'
import { flattenLocale } from '../../../shared/ContentfulLibs'

export const sortNews = (left, right, withPreferred = false) => {
  let a = new Date(left.fields.publishedDate)
  let b = new Date(right.fields.publishedDate)

  if (withPreferred) {
    let aPreferred = left.fields.preferOnHomepage
    let bPreferred = right.fields.preferOnHomepage

    if (aPreferred && !bPreferred) {
      return -1
    } else if (bPreferred && !aPreferred) {
      return 1
    }
  }

  if (a < b) {
    return 1
  } else if (b < a) {
    return -1
  }
  return 0
}

const mapStateToProps = (state) => {
  let allNews = []
  if (state.allNews && state.allNews.status === statuses.SUCCESS) {
    allNews = state.allNews.json
      .map((entry) => {
        flattenLocale(entry.fields, 'en-US')
        return entry
      })
      .sort((a, b) => sortNews(a, b, true))
      .slice(0, 3)
  }
  return {
    allNews,
    allNewsStatus: state.allNews.status,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchAllNews }, dispatch)
}

export class AllNewsContainer extends Component {
  componentDidMount () {
    if (this.props.allNewsStatus === statuses.NOT_FETCHED) {
      this.props.fetchAllNews(false)
    }
  }

  render () {
    return (
      <PresenterFactory
        presenter={Presenter}
        props={this.props.allNews}
        status={this.props.allNewsStatus} />
    )
  }
}

AllNewsContainer.propTypes = {
  allNewsStatus: PropTypes.string.isRequired,
  fetchAllNews: PropTypes.func.isRequired,
  allNews: PropTypes.array.isRequired,
}

const HoursPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllNewsContainer)

export default HoursPage
