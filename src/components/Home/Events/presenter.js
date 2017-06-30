import React from 'react'
import Link from '../../Link'
import LibMarkdown from '../../LibMarkdown'
import './style.css'

const Events = (entries) => {
  return (
    <section className='col-md-4 col-xs-12' aria-label='Events'>
      <h3>Events</h3>
      {
        entries.map((entry) => {
          return (
            <Link key={entry.slug} title={entry.title} to={'/event/' + entry.slug}>
              <div className='event-card'>
                <time dateTime="2014-09-24" className="date-as-calendar inline-flex">
                  <span className="weekday">{entry.displayWeekday}</span>
                  <span className="day">{entry.displayDay}</span>
                  <span className="month">{entry.displayMonth}</span>
                  <span className="year">{entry.displayYear}</span>
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
        })
      }
    </section>
  )
}

export default Events
