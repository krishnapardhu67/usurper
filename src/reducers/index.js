// Import all reducers here
import contentfulPage from './contentful/page'
import contentfulFloor from './contentful/floor'
import personalReducer from './personal'
import hoursReducer from './hours'
import searchReducer from './search'
import librarianInfo from './librarians'
import menuReducer from './menu'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  cfPageEntry: contentfulPage,
  cfFloorEntry: contentfulFloor,
  personal: personalReducer,
  librarianInfo: librarianInfo,
  hours: hoursReducer,
  search: searchReducer,
  menus: menuReducer,
})

export default rootReducer
