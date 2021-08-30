import {useState, useEffect, useCallback} from 'react'
import fetchEvents from './fetchEvents'

// a hook incorporating fetchEvents
// relies on auth being handled outside of the hook and an instance passed in
const useEvents = (isSignedIn) => {
  const [events, setEvents] = useState([])

  // takes events d1 and d2 and returns a negative value if d1 is before d2, ...
  const sorter = (d1, d2) => {
    const date1 = d1.start.dateTime
    const date2 = d2.start.dateTime
    return new Date(date1) - new Date(date2)
  }

  // an updater function
  const refreshEvents = useCallback(() => {
    // if auth isn't set up yet (either gapi hasn't initalized or it has and sign-in hasn't happened yet)
    if (!isSignedIn) return
    window.gapi.client.calendar.calendarList
      .list()
      .then((res) => {
        const promises = res.result.items
          .filter((i) => i.selected)
          // fetches all events from every calendar
          .map((d) => fetchEvents(d))
        Promise.all(promises).then((result) => {
          // some calendars return nothing, others return 7 events, etc.
          // this flattens it to get rid of that calnedar-level hierarchy and sorts by the start date
          setEvents(result.flat().sort(sorter))
        })
      })
      .catch((err) => console.log(err))
  }, [isSignedIn])

  // initial data load
  useEffect(() => {
    refreshEvents()
  }, [refreshEvents, isSignedIn])

  return [events, refreshEvents]
}

export default useEvents
