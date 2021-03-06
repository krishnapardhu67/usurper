import Config from '../../shared/Configuration'
import * as statuses from '../../constants/APIStatuses'

export const RECEIVE_RENEWAL = "RECEIVE_RENEWAL"
export const REQUEST_RENEWAL = "REQUEST_RENEWAL"

const requestRenewal = (barcode) => {
  return {
    type: REQUEST_RENEWAL,
    barcode: barcode,
  }
}

export const recieveRenewal = (barcode, state, json) => {
  return {
    type: RECEIVE_RENEWAL,
    barcode: barcode,
    state: state,
    json: json,
  }
}

export const renewAleph = (barcode, alephId) => {
  return (dispatch, getState) => {
    var state = getState().personal
    dispatch(requestRenewal(barcode))
    let url = Config.resourcesAPI + '/aleph/renew'
    return fetch(url, {
      method: 'post',
      headers: {
        'barcode': barcode,
        'aleph-id': alephId,
        'Authorization': state.login.token,
      },
    })
    .then(response => { return response.json() })
    .then(json => dispatch(
      recieveRenewal(barcode, statuses.SUCCESS, json)
    ))
    .catch((e) => {
      console.log(e)
      dispatch(recieveRenewal(barcode, statuses.ERROR, e))
    })
  }
}
