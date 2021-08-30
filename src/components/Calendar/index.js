import {Fragment} from 'react'
import Event from './Event'
import useEvents from './useEvents'
import useAuth from '../useAuth.js'

const Calendar = () => {
  const [isSignedIn, setIsSignedIn] = useAuth()
  const [events, refreshEvents] = useEvents(isSignedIn)

  const eventsObj =
    events &&
    events.reduce((acc, d) => {
      let date = new Date(d.start.dateTime)
      date = date.toDateString().slice(0, -5) // Sun Aug 29 2021 -> Sun Aug 29
      if (!acc[date]) acc[date] = []
      acc[date].push(d)
      return acc
    }, {})

  return (
    <div className="calendar">
      {!isSignedIn && <button onClick={setIsSignedIn}>sign in</button>}
      <button onClick={refreshEvents}> load events</button>
      {eventsObj &&
        // prints events with a h3 denoting the day above each group (e.g. "Sun Aug 29")
        Object.entries(eventsObj).map((day, i) => {
          const [key, value] = day
          return (
            <Fragment key={i}>
              <h3>{key}</h3>
              {value.map((event) => (
                <Event key={event.id} {...event} />
              ))}
            </Fragment>
          )
        })}
    </div>
  )
}

export default Calendar
