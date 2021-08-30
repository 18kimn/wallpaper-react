import {Card} from '@material-ui/core'

const formatDate = (str) => {
  const d = new Date(str)
  return d.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
}

const styles = {
  card: {
    width: 'fit-content',
    maxWidth: '400px',
    padding: '0 10px 10px 10px',
    marginBottom: '10px',
  },
}

const Event = (item) => {
  const {summary, start, end, backgroundColor} = item
  return (
    <Card style={{...styles.card, backgroundColor}}>
      <h4>{summary}</h4>
      <p>{formatDate(start.dateTime) + '-' + formatDate(end.dateTime)}</p>
    </Card>
  )
}

export default Event
