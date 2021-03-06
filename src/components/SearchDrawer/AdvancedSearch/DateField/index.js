import React from 'react'
import { connect } from 'react-redux'
import DateField from './presenter'
import { setSearchOption } from '../../../../actions/advancedSearch'

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const padZero = (n) => {
    if (n < 10) {
      n = '0' + n
    }
    return n
  }

  return {
    onChange: (e) => {
      dispatch(setSearchOption(e.target.id, e.target.value))
    },
    formatID: (n, p) => {
      return `${p}_${padZero(n)}`
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateField)
