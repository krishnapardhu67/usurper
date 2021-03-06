'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import getResources from '../../actions/personal/loanResources'
import * as statuses from '../../constants/APIStatuses'

import Resources from './presenter'

class ResourceContainer extends Component {
  checkLoggedIn (props) {
    if ((!props.resources.have.exists ||
      !props.resources.pending.exists) &&
      props.loggedIn) {
      props.dispatch(getResources(props.login.token))
    }
  }

  componentWillMount () {
    this.checkLoggedIn(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.checkLoggedIn(nextProps)
  }

  render () {
    if (!this.props.resources.have && !this.props.resources.pending) {
      return <div />
    }

    return <Resources {...this.props} />
  }
}

const get = (dict, key, defaultVal) => {
  if (!dict || !dict.hasOwnProperty(key)) {
    return defaultVal
  }
  return dict[key]
}

export const mapStateToProps = (state) => {
  const { personal, renewal } = state
  const loggedIn = get(personal.login, 'state', '') === statuses.SUCCESS

  const alephHave = personal.alephHave
  const alephPending = personal.alephPending
  const illHave = personal.illHave
  const illPending = personal.illPending

  const checkedOut = get(alephHave, 'checkedOut', []).concat(get(illHave, 'checkedOut', []))
  const pendingItems = get(alephPending, 'pending', []).concat(get(illPending, 'pending', []))

  const haveFetching = (get(alephHave, 'state', false) === statuses.FETCHING
                        || get(illHave, 'state', false) === statuses.FETCHING)

  const pendingFetching = (get(alephPending, 'state', false) === statuses.FETCHING
                        || get(illPending, 'state', false) === statuses.FETCHING)

  return {
    loggedIn: loggedIn,
    login: personal.login,
    alephId: personal.user ? personal.user.alephId : null,
    renewal: renewal,
    resources: {
      have: {
        exists: get(alephHave, 'state', false) && get(illHave, 'state', false),
        loading: haveFetching,
        items: checkedOut,
        emptyText: 'You have no Checked Out Items',
      },
      pending: {
        exists: get(alephPending, 'state', false) && get(illPending, 'state', false),
        loading: pendingFetching,
        items: pendingItems,
        emptyText: 'You have no Pending Items',
      },
    },
  }
}

export default connect(mapStateToProps)(ResourceContainer)
