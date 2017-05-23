import React from 'react'
import { connect } from 'react-redux'
import Navigation from './presenter'
import { openSearchDrawer, closeSearchDrawer, closeSearchBox } from '../../actions/search'
import {
  openMenu,
  closeMenus,
  RESEARCH_MENU,
  SERVICES_MENU,
  LIBRARIES_MENU,
  ABOUT_MENU,
  ASK_MENU,
} from '../../actions/menu'

const mapStateToProps = (state, ownProps) => {
  return {
    search: state.search,
    menus: state.menus,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const preventDefault = (e) => {
    dispatch(closeSearchBox())
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }
  return {
    openSearchDrawer: (e) => {
      dispatch(openSearchDrawer())
      preventDefault(e)
    },
    closeSearchDrawer: (e) => {
      dispatch(closeSearchDrawer())
      preventDefault(e)
    },
    openResearch: (e) => {
      dispatch(openMenu(RESEARCH_MENU))
      preventDefault(e)
    },
    openServices: (e) => {
      dispatch(openMenu(SERVICES_MENU))
      preventDefault(e)
    },
    openLibraries: (e) => {
      dispatch(openMenu(LIBRARIES_MENU))
      preventDefault(e)
    },
    openAbout: (e) => {
      dispatch(openMenu(ABOUT_MENU))
      preventDefault(e)
    },
    openAsk: (e) => {
      dispatch(openMenu(ASK_MENU))
      preventDefault(e)
    },
    closeMenus: (e) => {
      dispatch(closeMenus())
      preventDefault(e)
    },
  }
}

const mergeProps = (state, dispatchProps, ownProps) => {
  return {
    handleDrawerClick: state.search.drawerOpen ? dispatchProps.closeSearchDrawer : dispatchProps.openSearchDrawer,
    handleResearchClick: state.menus.menuId === RESEARCH_MENU ? dispatchProps.closeMenus : dispatchProps.openResearch,
    handleServicesClick: state.menus.menuId === SERVICES_MENU ? dispatchProps.closeMenus : dispatchProps.openServices,
    handleLibrariesClick: state.menus.menuId === LIBRARIES_MENU ? dispatchProps.closeMenus : dispatchProps.openLibraries,
    handleAboutClick: state.menus.menuId === ABOUT_MENU ? dispatchProps.closeMenus : dispatchProps.openAbout,
    handleAskClick: state.menus.menuId === ASK_MENU ? dispatchProps.closeMenus : dispatchProps.openAsk,
    ...state,
    ...dispatchProps,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Navigation)