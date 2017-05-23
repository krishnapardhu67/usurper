import React from 'react'
import PropTypes from 'prop-types'
import Header from '../Header'
import Footer from '../Footer'
import '../../static/css/global.css'

const PageWrapper = (props) => (
  <div onClick={props.clickOnPage}>
    <Header {...props} />
    <div className={'container-fluid'}>
      {props.children}
    </div>
    <Footer />
  </div>
)

PageWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
}
export default PageWrapper