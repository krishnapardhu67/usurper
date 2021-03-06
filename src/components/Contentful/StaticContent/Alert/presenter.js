// Presenter component for a Floor content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import '../../../../static/css/global.css'
import PageAlert from '../../Alert/Page'

const Presenter = ({ cfStatic }) => (
  <PageAlert alerts={cfStatic.fields.alerts} />
)

Presenter.propTypes = {
  cfStatic: PropTypes.object.isRequired,
}

export default Presenter
