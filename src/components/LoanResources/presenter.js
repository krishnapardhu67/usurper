'use strict'
import React from 'react'
import PropTypes from 'prop-types'

import ResourceList from './ResourceList'

const LoanResources = (props) => {
  let have = props.resources.have
  let pending = props.resources.pending

  let malcHave = props.resources.malc.have
  let malcPending = props.resources.malc.pending

  return (
    <div key='LoanResources' className='resources-list'>
      <h2>Hesburgh Library</h2>
      <h3>{ pending.items.length + ' Item' + (pending.items.length !== 1 ? 's' : '') + ' Pending' }</h3>
      <ResourceList
        list={pending.items}
        emptyText={pending.emptyText}
        loading={pending.loading}
        alephId={props.alephId}
        renewal={props.renewal}
        borrowed={false}
        listType='Pending'
      />
      <br />
      <h3>{ have.items.length + ' Item' + (have.items.length !== 1 ? 's' : '') + ' Checked Out'}</h3>
      <ResourceList
        list={have.items}
        emptyText={have.emptyText}
        loading={have.loading}
        alephId={props.alephId}
        renewal={props.renewal}
        borrowed={true}
        listType='Checked Out'
      />
      <br />
      <h2>Other Libraries</h2>
      <h3>{ malcPending.items.length + ' Item' + (malcPending.items.length !== 1 ? 's' : '') + ' Pending'}</h3>
      <ResourceList
        list={malcPending.items}
        emptyText={malcPending.emptyText}
        loading={malcPending.loading}
        alephId={props.alephId}
        borrowed={false}
        listType='Pending'
      />
      <br />
      <h3>{ malcHave.items.length + ' Item' + (malcHave.items.length !== 1 ? 's' : '') + ' Checked Out'}</h3>
      <ResourceList
        list={malcHave.items}
        emptyText={malcHave.emptyText}
        loading={malcHave.loading}
        alephId={props.alephId}
        borrowed={true}
        listType='Checked Out'
      />
    </div>
  )
}

LoanResources.propTypes = {
  resources: PropTypes.object,
  renewal: PropTypes.object,
  alephId: PropTypes.string,
}

export default LoanResources
