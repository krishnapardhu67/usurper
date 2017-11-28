'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import getResources from '../../actions/personal/loanResources'
import * as statuses from '../../constants/APIStatuses'

import Resources from './presenter'

class ResourceContainer extends Component {
  checkLoggedIn (props) {
    if (!props.fetching && props.loggedIn) {
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

  const getBorrowed = (libs) => {
    let out = []
    for (let i in libs) {
      let libCode = libs[i]
      let lib = get(personal, libCode + 'Have', {})
      let web = get(lib, 'web', [])
      let checkedOut = get(lib, 'checkedOut', [])
      out = out.concat(web, checkedOut)
    }

    return out
  }

  const getPending = (libs) => {
    let out = []
    for (let i in libs) {
      let libCode = libs[i]
      let lib = get(personal, libCode + 'Pending', {})
      let pending = get(lib, 'pending', [])
      out = out.concat(pending)
    }
    return out
  }

  const isFetching = (libs, pending = false) => {
    let postfix = pending ? 'Pending' : 'Have'
    for (let i in libs) {
      let libCode = libs[i]
      let lib = get(personal, libCode + postfix, {})
      if (get(lib, 'state', false) === statuses.FETCHING) {
        return true
      }
    }

    return false
  }

  return {
    loggedIn: loggedIn,
    login: personal.login,
    alephId: personal.user ? personal.user.alephId : null,
    renewal: renewal,
    fetching: personal.user ? true : false,
    resources: {
      have: {
        loading: isFetching(['ndu']),
        items: getBorrowed(['ndu']),
        emptyText: 'You have no Checked Out Items',
      },
      pending: {
        loading: isFetching(['ndu'], true),
        items: getPending(['ndu']),
        emptyText: 'You have no Pending Items',
      },
      malc: {
        have: {
          loading: isFetching(['hcc', 'bci', 'smc', 'ill']),
          items: getBorrowed(['hcc', 'bci', 'smc', 'ill']),
          emptyText: 'You have no Checked Out MALC items',
        },
        pending: {
          loading: isFetching(['hcc', 'bci', 'smc', 'ill'], true),
          items: getPending(['hcc', 'bci', 'smc', 'ill']),
          emptyText: 'You have no Pending MALC items',
        },
      },
    },
  }
}

export default connect(mapStateToProps)(ResourceContainer)
