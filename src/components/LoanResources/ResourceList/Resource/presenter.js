import React from 'react'
import PropTypes from 'prop-types'
import Actions from './Actions'
import { hasActions } from './Actions/presenter'

const Card = (className, prefix, data, label) => {
  if (data) {
    return (<div className={className} aria-label={label}>{prefix + data}</div>)
  }
  return <div className={className} />
}

const actionsButton = (item, toggleHidden, renewal) => {
  if (hasActions(item)) {
    return (
      <div className={'actions-button'}>
        <span onClick={toggleHidden} title='More Actions'>⁝</span>
      </div>
    )
  }
}

const ResourceList = (props) => {
  return (
    <div className='card-item' aria-label={props.item.title}>
      <div className='card-header'>
        <div className='card-title'>{props.item.title}</div>
        <div
          className='card-subtitle'
          aria-label={'Published: ' + props.item.published}
        >
          {props.item.published}
        </div>
      </div>
      { Card('card-author', '', props.item.author, 'Author: ' + props.item.author) }
      { !props.borrowed && Card('card-status', '', props.item.status, 'Status: ' + props.item.status) }
      { props.borrowed && Card('card-due', '', props.item.dueDate, 'Due: ' + props.item.dueDate) }
      { Card('card-pickup', 'Pickup Location: ', props.item.pickupLocation) }

      { actionsButton(props.item, props.toggleHidden, props.renewal) }
      <div className={'actions' + (props.hidden ? '-hidden' : '')}>
        <Actions item={props.item} alephId={props.alephId} renewal={props.renewal} />
      </div>
    </div>
  )
}

ResourceList.propTypes = {
  item: PropTypes.object.isRequired,
  renewal: PropTypes.object,
}

export default ResourceList
