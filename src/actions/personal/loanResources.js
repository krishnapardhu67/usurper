import Config from '../../shared/Configuration'
import * as states from './constants'
import * as statuses from '../../constants/APIStatuses'

export const handleUser = (dispatch, data) => {
  dispatch(
    states.recievePersonal(
      'user',
      statuses.SUCCESS,
      data.user,
    )
  )
}

export const handleResources = (type) => {
  return (dispatch, data) => {
    if (data.checkedOut) {
      dispatch(
        states.recievePersonal(
          type + 'Have',
          statuses.SUCCESS,
          {
            checkedOut: data.checkedOut,
            web: data.web,
          }
        )
      )
    } else {
      dispatch(
        states.recievePersonal(
          type + 'Pending',
          statuses.SUCCESS,
          {
            pending: data.pending,
          }
        )
      )
    }
  }
}

const doQuery = (dispatch, service, query, func, token, stateKey, retry = 0) => {
  dispatch(states.requestPersonal(stateKey))
  states.startRequest(
    Config.resourcesAPI + '/' + service + query,
    dispatch,
    func,
    token,
    (e) => {
      console.log(e)
      if (retry === 0) {
        console.log('Error, retrying ' + service + ' ' + query)
        doQuery(dispatch, service, query, func, token, stateKey, 1)
      } else {
        dispatch(states.recievePersonal(stateKey, statuses.ERROR, e.message))
      }
    }
  )
}

export const getUser = () => {
  return (dispatch, getState) => {
    var state = getState().personal
    doQuery(dispatch, 'aleph', '?type=user', handleUser, state.login.token, 'user')
  }
}

export const getPending = () => {
  return (dispatch, getState) => {
    let state = getState().personal
    let token = state.login.token
    doQuery(dispatch, 'aleph', '?type=pending', handleResources('ndu'), token, 'nduPending')
    doQuery(dispatch, 'aleph', '?type=pending&library=hcc50', handleResources('hcc'), token, 'hccPending')
    doQuery(dispatch, 'aleph', '?type=pending&library=bci50', handleResources('bci'), token, 'bciPending')
    doQuery(dispatch, 'aleph', '?type=pending&library=smc50', handleResources('smc'), token, 'smcPending')
    doQuery(dispatch, 'illiad', '?type=pending', handleResources('ill'), token, 'illPending')
  }
}

export const getBorrowed = () => {
  return (dispatch, getState) => {
    let state = getState().personal
    let token = state.login.token

    doQuery(dispatch, 'aleph', '?type=borrowed', handleResources('ndu'), token, 'nduHave')
    doQuery(dispatch, 'aleph', '?type=borrowed&library=hcc50', handleResources('hcc'), token, 'hccHave')
    doQuery(dispatch, 'aleph', '?type=borrowed&library=bci50', handleResources('bci'), token, 'bciHave')
    doQuery(dispatch, 'aleph', '?type=borrowed&library=smc50', handleResources('smc'), token, 'smcHave')
    doQuery(dispatch, 'illiad', '?type=borrowed', handleResources('ill'), token, 'illHave')
  }
}

const getResources = () => {
  return (dispatch, getState) => {
    getUser()(dispatch, getState)
    getPending()(dispatch, getState)
    getBorrowed()(dispatch, getState)
  }
}

export default getResources
