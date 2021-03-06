import React from 'react'
import PropTypes from 'prop-types'

import Link from '../../../../Link'
import * as Statuses from '../../../../../constants/APIStatuses'

const ILLRenew = (item, message) => {
  if (message && item.transactionNumber) {
    return <span className='failure'>{message}</span>
  }
}

const IllWeb = (item, url) => {
  if (!item.transactionNumber) {
    return null
  }

  if (item.status === 'Delivered to Web') {
    return (
      <Link to={url} className='button' >
        View On Web
      </Link>
    )
  }
  return null
}

const IllView = (item, url) => {
  if (!item.transactionNumber) {
    return null
  }

  return (
    <Link to={url} className='button'>
      View in ILL
    </Link>
  )
}

const AlephRenew = (item, renewal, onRenewClick, renewMessage) => {
  if (item.status === 'On Loan') {
    if (renewal && renewal[item.barcode]) {
      if (renewal[item.barcode].state === Statuses.FETCHING) {
        return (
          <div className='sk-three-bounce'>
            <div className='sk-child sk-bounce1' />
            <div className='sk-child sk-bounce2' />
            <div className='sk-child sk-bounce3' />
          </div>
        )
      }
    }

    if (renewMessage) {
      let messageClass = 'status' + renewal[item.barcode].data.renewStatus === 200 ? ' success' : ' failure'
      return (<span className={messageClass}>{renewMessage}</span>)
    } else {
      return (<button onClick={onRenewClick}>Renew</button>)
    }
  } else {
    return null
  }
}

export const hasActions = (item) => {
  return (
    (AlephRenew(item, null, (e) => {}, null) !== null) ||
    (IllWeb(item, null) !== null) ||
    (IllView(item, null) !== null)
  )
}

const Actions = (props) => {
  return (
    <div>
      { AlephRenew(props.item, props.renewal, props.onRenewClick, props.renewMessage) }
      { ILLRenew(props.item, props.renewMessage) }
      { IllWeb(props.item, props.illWebUrl) }
      { IllView(props.item, props.illViewUrl) }
    </div>
  )
}

Actions.propTypes = {
  item: PropTypes.object.isRequired,
  onRenewClick: PropTypes.func.isRequired,
  renewal: PropTypes.object,
  renewMessage: PropTypes.string,
  illWebUrl: PropTypes.string,
  illViewUrl: PropTypes.string,
}

export default Actions
