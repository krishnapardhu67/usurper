import fetch from 'isomorphic-fetch'
import Config from '../../shared/Configuration'
import * as statuses from '../../constants/APIStatuses'

export const CF_REQUEST_NEWS = 'CF_REQUEST_NEWS'
export const requestNews = (news) => {
  return {
    type: CF_REQUEST_NEWS,
    news,
  }
}

export const CF_RECEIVE_NEWS = 'CF_RECEIVE_NEWS'
const receiveNews = (news, response) => {
  let error = {
    type: CF_RECEIVE_NEWS,
    status: statuses.fromHttpStatusCode(response.errorStatus),
    error: response,
    receivedAt: Date.now(),
  }

  let success = {
    type: CF_RECEIVE_NEWS,
    status: statuses.SUCCESS,
    news: response[0],
    receivedAt: Date.now(),
  }

  try {
    if (response[0].sys.contentType.sys.id === 'news') {
      return success
    } else {
      return error
    }
  } catch (e) {
    return error
  }
}

export const fetchNews = (news, preview) => {
  const query = encodeURIComponent(`content_type=news&fields.slug=${news}&include=4`)
  let url = `${Config.contentfulAPI}/entry/query?locale=en-US&query=${query}&preview=${preview}`
  return (dispatch, getState) => {
    dispatch(requestNews(news))

    return fetch(url)
      .then(response => response.ok ? response.json() : { errorStatus: response.status })
      .then(json => dispatch(receiveNews(news, json)))
      .catch(response => dispatch(receiveNews(news, response)))
  }
}
