import React from 'react'
import Image from '../../Image'
import Link from '../../Link'
import LibMarkdown from '../../LibMarkdown'
import PageTitle from '../../PageTitle'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import './style.css'

const News = (entries) => {
  return (
      <div className='news-page'>
      <PageTitle title='News' />
      <SearchProgramaticSet open={false} />
      <div className='row'>
      <div className='col-md-9 col-xs-12'>
      <section aria-label='News'>
        {
          entries.map((entry) => {
            return (
              <Link key={entry.fields.slug} ariaLabel={entry.fields.title} to={'/news/' + entry.fields.slug}>
                <div className='news-card'>
                  <Image cfImage={entry.fields.image} />
                  <header>
                    <h3>{entry.fields.title}</h3>
                  </header>
                  <div className='description'>
                    <LibMarkdown>{entry.fields.shortDescription}</LibMarkdown>
                  </div>
                </div>
              </Link>
            )
          })
        }
      </section>
      </div>
      <div className='col-md-2 col-md-offset-1 col-xs-12'>
        <h3>Academic Year</h3>
          <ul>
            <li><Link to='#'>2017-2018</Link></li>
            <li><Link to=''>2016-2017</Link></li>
          </ul>
      </div>
      </div>
    </div>
  )
}

export default News
