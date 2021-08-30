// given a calendar object, which contains ID and backgroundcolor among other things,
// fetches all of the events from today to a week in the future in that calendar
// defined outside of the component to avoid using useCallback()
const fetchEvents = ({id, backgroundColor}) => {
  const d = new Date()
  const beginning = new Date(d.setHours(0, 0, 0, 0)).toISOString()
  const end = new Date(d.setDate(d.getDate() + 7)).toISOString()

  return window.gapi.client.calendar.events
    .list({
      'calendarId': id,
      'timeMax': end,
      'timeMin': beginning,
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime',
    })
    .then((response) =>
      response.result.items.map((item) => ({...item, backgroundColor})),
    )
}

export default fetchEvents
