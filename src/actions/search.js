export const SET_SEARCH = 'SET_SEARCH'
export const OPEN_SEARCHBOX = 'OPEN_SEARCHBOX'
export const CLOSE_SEARCHBOX = 'CLOSE_SEARCHBOX'
export const SAVE_SEARCH_PREFERENCE = 'SAVE_SEARCH_PREFERENCE'
export const CLEAR_SEARCH_PREFERENCE = 'CLEAR_SEARCH_PREFERENCE'

export function setSearchType (searchType) {
  return {
    type: SET_SEARCH,
    searchType
  }
}
export function openSearchBox () {
  return {
    type: OPEN_SEARCHBOX
  }
}

export function closeSearchBox () {
  return {
    type: CLOSE_SEARCHBOX
  }
}

export function saveSearchPreference (pref) {
  return {
    type: SAVE_SEARCH_PREFERENCE,
    hasPref: true,
    pref
  }
}

export function clearSearchPreference () {
  return {
    type: CLEAR_SEARCH_PREFERENCE,
    hasPref: false,
    pref: null
  }
}

export const actions = {
  setSearchType,
  openSearchBox,
  closeSearchBox,
  saveSearchPreference,
  clearSearchPreference
}
