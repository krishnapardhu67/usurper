import { CF_REQUEST_ALLEVENTS, CF_RECEIVE_ALLEVENTS, CF_NO_SUCH_ALLEVENTS } from '../../actions/contentful/allEvents'
import * as statuses from '../../constants/APIStatuses'

export default(state = { status: statuses.NOT_FETCHED }, action) => {
  switch (action.type) {
    case CF_REQUEST_ALLEVENTS:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
      })
    case CF_RECEIVE_ALLEVENTS:
      return Object.assign({}, state, {
        status: action.status,
        json: action.allEvents,
      })
    case CF_NO_SUCH_ALLEVENTS:
      return Object.assign({}, state, {
        status: action.status,
      })
    default:
      return state
  }
}
