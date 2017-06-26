import { CF_REQUEST_SERVICEPOINTS, CF_RECEIVE_SERVICEPOINTS, CF_NO_SUCH_SERVICEPOINTS } from '../../actions/contentful/servicePoints'
import * as statuses from '../../constants/APIStatuses'

export default(state = { status: statuses.NOT_FETCHED }, action) => {
  switch (action.type) {
    case CF_REQUEST_SERVICEPOINTS:
      return Object.assign({}, state, {
        status: statuses.FETCHING
      })
    case CF_RECEIVE_SERVICEPOINTS:
      return Object.assign({}, state, {
        status: action.status,
        json: action.servicePoints
      })
    case CF_NO_SUCH_SERVICEPOINTS:
      return Object.assign({}, state, {
        status: action.status
      })
    default:
      return state
  }
}
