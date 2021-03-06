import * as actions from '../../actions/contentful/page'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'
import * as statuses from '../../constants/APIStatuses'
import Config from '../../shared/Configuration'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const mockPageResponse = {
  "sys": {
    "contentType": {
      "sys": {
        "id": "page"
      }
    },
  },
  "fields": {
    "title": "About",
    "shortContent": "Short text about about page.",
    "url": "about",
    "content": "Full content of about page."
  }
}

const storeInit = {
  personal: {
    login: null,
  },
}

describe('contentful requestPage action creator', () => {
  it('should create a CF_REQUEST_PAGE action for the requested page', () => {
    const pageUri = 'Page data'
    const expectedAction = {
      slug: pageUri,
      type: actions.CF_REQUEST_PAGE,
    }
    expect(actions.requestPage(pageUri)).toEqual(expectedAction)
  })
})

describe('contentful clearPage action creator', () => {
  it('should create a CF_CLEAR_PAGE action', () => {
    const expectedAction = {
      type: actions.CF_CLEAR_PAGE,
    }

    const store = mockStore(storeInit)
    store.dispatch(actions.clearPage())
    expect(store.getActions()[0]).toMatchObject(expectedAction)
  })
})

describe('contentful fetchPage async action creator', () => {
  it('should first create a CF_REQUEST_PAGE action for the requested page', () => {
    nock(Config.contentfulAPI)
      .get(/.*/)
      .reply(200, mockPageResponse)
    const pageUri = 'Page data'
    const expectedAction = {
      type: actions.CF_REQUEST_PAGE,
      slug: pageUri,
    }

    const store = mockStore(storeInit)
    return store.dispatch(actions.fetchPage(pageUri))
      .then(() => {
        expect(store.getActions()[0]).toMatchObject(expectedAction)
      })
  })

  describe('on search hit', () => {
    beforeEach(() => {
      nock(Config.contentfulAPI)
        .get(/.*/)
        .reply(200, mockPageResponse)
    })
    afterEach(() => {
      nock.cleanAll()
    })

    it('should create a CF_RECEIVE_PAGE action for the first page returned in the search', () => {
      const pageUri = 'mypage'
      const expectedAction = {
        type: actions.CF_RECEIVE_PAGE,
        status: statuses.SUCCESS,
        page: mockPageResponse,
      }

      const store = mockStore(storeInit)
      return store.dispatch(actions.fetchPage(pageUri))
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })
  })

  describe('on receiving an error from contentful API', () => {
    beforeEach(() => {
      nock(Config.contentfulAPI)
        .get(/.*/)
        .reply(200, { sys: { type: 'Error' }, error: 'Error message' })
    })
    afterEach(() => {
      nock.cleanAll()
    })

    it('should create a CF_RECEIVE_PAGE action with a status of error and the full response', () => {
      const pageUri = 'mypage'
      const expectedAction = {
        type: actions.CF_RECEIVE_PAGE,
        status: statuses.ERROR,
        error: { sys: { type: 'Error' }, error: 'Error message' },
      }

      const store = mockStore(storeInit)
      return store.dispatch(actions.fetchPage(pageUri))
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })
  })

  describe('on throwing an exception when fetching the page', () => {
    beforeEach(() => {
      nock(Config.contentfulAPI)
        .get(/.*/)
        .replyWithError('Crash Message')
    })
    afterEach(() => {
      nock.cleanAll()
    })

    it('should create a CF_RECEIVE_PAGE action with a status of error and the full response', () => {
      const pageUri = 'mypage'
      const expectedAction = {
        type: actions.CF_RECEIVE_PAGE,
        status: statuses.ERROR,
      }

      const store = mockStore(storeInit)
      return store.dispatch(actions.fetchPage(pageUri))
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
          expect(store.getActions()[1].error.message).toMatch(/Crash Message/)
        })
    })
  })

  describe('on receiving a 404 from contentful API', () => {
    beforeEach(() => {
      nock(Config.contentfulAPI)
        .get(/.*/)
        .reply(404, {})
    })
    afterEach(() => {
      nock.cleanAll()
    })

    it('should create a CF_RECEIVE_PAGE action with a status of error and the full response', () => {
      const pageUri = 'mypage'
      const expectedAction = {
        type: actions.CF_RECEIVE_PAGE,
        status: statuses.NOT_FOUND,
        error: { errorStatus: 404 },
      }

      const store = mockStore(storeInit)
      return store.dispatch(actions.fetchPage(pageUri))
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })
  })
})
