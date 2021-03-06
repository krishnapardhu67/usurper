import { connect } from 'react-redux'
import React from 'react'
import PageTitle from '../../PageTitle'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import Link from '../../Link'
import ServiceNowLink from '../../ServiceNowLink'
import { Helmet } from 'react-helmet'

const Error = ({ message = 'An error has occured' }) => (
  <div className={'Error'}>
    <SearchProgramaticSet open={true} />
    <PageTitle title='Server Error' />
    <Helmet>
      <meta name='prerender-status-code' content='500' />
    </Helmet>
    <div className='notfound errored'>
      <h1>500</h1>
      <h2>Error</h2>
      <div>{ message }
        <br />
        If you think you've reached this page in error, please <ServiceNowLink>report your problem</ServiceNowLink>.
      </div>
    </div>
  </div>
)

export default Error
