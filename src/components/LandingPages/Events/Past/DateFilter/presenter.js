import React from 'react'
import Link from '../../../../Link'
import PropTypes from 'prop-types'

const DateFilter = (props) => {
  return (
    <aside aria-label='Select archived month to display' role='navigation' className='dateFilter'>
      <div className='group'>
        <h5>Archive</h5>
        <ul className='archive'>
          {
            Object.keys(props.eventDates).reverse().map((year, yIndex) => {
              return (
                <li
                  key={'filter_' + yIndex}
                  className={props.expanded.includes(year) ? 'expanded' : 'collapsed'}
                >
                  <a
                    className='yearFilter'
                    onClick={props.yearCallback}
                  >
                    {year}
                  </a>
                  <ul className={'monthFilter' + (props.expanded.includes(year) ? '' : ' hidden')}>
                    {
                      Object.keys(props.eventDates[year]).reverse().map((month, mIndex) => {
                        return (
                          <li key={'filterMonth_' + mIndex}>
                            <Link to={props.eventDates[year][month].url}>
                              {props.eventDates[year][month].display + ' (' + props.eventDates[year][month].count + ')'}
                            </Link>
                          </li>
                        )
                      })
                    }
                  </ul>
                </li>
              )
            })
          }
        </ul>
      </div>
    </aside>
  )
}

DateFilter.propTypes = {
  eventDates: PropTypes.object.isRequired,
  yearCallback: PropTypes.func.isRequired,
  expanded: PropTypes.array.isRequired,
}

export default DateFilter
