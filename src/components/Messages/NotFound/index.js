import { connect } from 'react-redux'
import React from 'react'
import PageTitle from '../../PageTitle'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import Link from '../../Link'
import ServiceNowLink from '../../ServiceNowLink'
import { Helmet } from 'react-helmet'

const NotFound = ({ message = 'The requested page could not be found' }) => (
  <div className={'NotFound content'}>
    <SearchProgramaticSet open />
    <PageTitle title='Page Not Found' />
    <Helmet>
      <meta name='prerender-status-code' content='404' />
    </Helmet>
    <div className='notfound'>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <div>{ message }<br />
        If you think you've reached this page in error, please <ServiceNowLink isWebContent>report your problem</ServiceNowLink>.
      </div>
    </div>
  </div>
)

export default NotFound
