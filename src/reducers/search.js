import {
  SET_SEARCH,
  OPEN_SEARCHBOX,
  CLOSE_SEARCHBOX,
  SAVE_SEARCH_PREFERENCE,
  CLEAR_SEARCH_PREFERENCE,
  OPEN_SEARCHDRAWER,
  CLOSE_SEARCHDRAWER,
  SITE_SEARCH_REQUEST,
  SITE_SEARCH_RESPONSE,
} from '../actions/search.js'

const localSearchPref = localStorage.getItem('searchPreference')
export default (
  state = {
    drawerOpen: true,
    searchType: 'ONESEARCH',
    searchBoxOpen: false,
    hasPref: localSearchPref !== null,
    usePref: true,
    pref: JSON.parse(localSearchPref) || null,
  },
  action
) => {
  switch (action.type) {
    case SET_SEARCH:
      return Object.assign({}, state, {
        searchType: action.searchType,
        usePref: false,
      })
    case OPEN_SEARCHBOX:
      return Object.assign({}, state, { searchBoxOpen: true })
    case CLOSE_SEARCHBOX:
      return Object.assign({}, state, { searchBoxOpen: false })
    case SAVE_SEARCH_PREFERENCE:
      localStorage.setItem('searchPreference', JSON.stringify(action.pref))
      return Object.assign(
        {},
        state,
        {
          hasPref: true,
          usePref: true,
          pref: action.pref,
        }
      )
    case CLEAR_SEARCH_PREFERENCE:
      localStorage.removeItem('searchPreference')
      return Object.assign(
        {},
        state,
        { hasPref: false, usePref: false, pref: null }
      )
    case OPEN_SEARCHDRAWER:
      return Object.assign({}, state, { drawerOpen: true })
    case CLOSE_SEARCHDRAWER:
      return Object.assign({}, state, { drawerOpen: false })
    case SITE_SEARCH_REQUEST:
      return Object.assign({}, state, { query: action.query })
    case SITE_SEARCH_RESPONSE:
      console.log(action)
      return Object.assign({}, state, {
        items: action.items,
        searchInformation: action.searchInformation,
        queries: action.queries,
      })
    default:
      return state
  }
}
