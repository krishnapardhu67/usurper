import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import SearchOptionList from '../../../../components/SearchDrawer/SearchOptionList'

const setup = (props) => {
  const store = configureStore()(props)
  return mount(
    <Provider store={store}>
      <SearchOptionList {...props} />
    </Provider>
  )
}
let enzymeWrapper
let props = {
  search: {
    searchBoxOpen: true,
  },
}

describe('component/SearchDrawer/SearchOptionList', () => {
  beforeEach(() => {
    enzymeWrapper = setup(props)
  })
  afterEach(() => {
    enzymeWrapper = null
  })

  it('Renders when searchBoxOpen is true', () => {
    expect(enzymeWrapper.find('.uSearchOptionList').exists()).toBe(true)
  })

  it('Renders 4 options', () => {
    expect(enzymeWrapper.find('li.uSearchOption')).toHaveLength(4)
  })

  it('Renders hidden when searchBoxOpen is false', () => {
    enzymeWrapper = setup({ search: { searchBoxOpen: false } })
    expect(enzymeWrapper.find('.uSearchOptionList.hidden').exists()).toBe(true)
  })
})
