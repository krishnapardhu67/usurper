import React from 'react'
import Image from '../../Image'
import Link from '../../Link'
import LibMarkdown from '../../LibMarkdown'
import PageTitle from '../../PageTitle'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import './style.css'

const makeEntry = (entry) => {
  return (
    <Link key={entry.slug} ariaLabel={entry.title + ' on ' + entry.displayWeekday + ', ' + entry.displayDay + ' ' + entry.displayMonth + ' ' + entry.displayYear} to={'/event/' + entry.slug} className='event-link'>
      <div className='event-card'>
        <img src='http://via.placeholder.com/350x197' className='cover' />
        <time dateTime='2014-09-24' className='date-as-calendar inline-flex'>
          <span className='weekday'>{entry.displayWeekday}</span>
          <span className='day'>{entry.displayDay}</span>
          <span className='month'>{entry.displayMonth}</span>
          <span className='year'>{entry.displayYear}</span>
        </time>
        <div className='event-card-text'>
          <h3>{entry.title}</h3>
        </div>
        <div className='description'>
          <LibMarkdown>{entry.shortDescription}</LibMarkdown>
        </div>
      </div>
    </Link>
  )
}

const makeSection = (title, entries) => {
  if (!entries || entries.length <= 0) {
    return null
  }

  return (
    <section aria-label={title}>
      <h3 className='timeline'>{title}</h3>
      <div className='event-grid'>{
        entries.map(makeEntry)
      }</div>
    </section>
  )
}

const Events = (props) => {
  return (
    <div>
    <PageTitle title='Events' />
    <div className='row events-listing'>

    <div className='col-md-8 col-xs-12' >
      
      <SearchProgramaticSet open={false} />
      {
        makeSection('Current and Upcoming Events', props.present)
      }
      {
        makeSection('Past Events', props.past)
      }
    </div>
    <div className='col-md-3 col-md-offset-1 col-xs-12' >
    </div>
    </div>
    </div>
  )
}

export default Events
