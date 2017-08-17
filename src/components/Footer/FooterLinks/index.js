import React from 'react'
import Facebook from '../images/facebook.png'
import Twitter from '../images/twitter.png'
import Gov from '../images/fdlp-emblem-color.png'
import Link from '../../Link'

const FooterLinks = () => {
  return (
    <div id='footer-links'>
      <div className='container-fluid'>
        <div className='row bottom-xs'>
          <div className='col-xs-8'>
            <div className='box'>
              <ul role='navigation' aria-label='Footer Menu'>
                <li><Link to={`https://nd.service-now.com/nd_portal?id=sc_cat_item&sys_id=1198d67ddb4a7240de73f5161d961936&URL=${window.location}&lib_list_problem=lib_list_web_content`}>Website Feedback</Link></li>
                <li><Link to='/library-policies'>Library Policies</Link></li>
                <li><Link to='http://librarygiving.nd.edu'>Library Giving</Link></li>
                <li><Link to='/employment/'>Jobs</Link></li>
                <li><Link to='https://wiki.nd.edu/display/libintranet/Home'>Hesnet</Link></li>
                <li><Link to={`https://nd.service-now.com/nd_portal?id=sc_cat_item&sys_id=1198d67ddb4a7240de73f5161d961936&URL=${window.location}`}>Report A Problem</Link></li>
                <li><Link to='http://libguides.library.nd.edu/trumpadmin1' title='Federal Depository Library'><img src={Gov} className='gov' alt='gov' /></Link></li>
              </ul>
            </div>
          </div>

          <div className='col-xs-4'>
            <div className='box right'>
              <ul role='navigation' aria-label='Social Media Links'>
                <li><Link to='http://twitter.com/ndlibraries' title='Hesburgh Libraries Twitter' target='_blank' rel='noopener'><img src={Twitter} alt='Twitter' /> NDLibraries</Link></li>
                <li><Link to='https://www.facebook.com/NDLibraries/' title='Hesburgh Libraries Faceebook' target='_blank' rel='noopener'><img src={Facebook} alt='Facebook' /> NDLibraries</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FooterLinks
