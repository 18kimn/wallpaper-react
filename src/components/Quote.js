import {useState, useCallback, useEffect} from 'react'
import {Card, CardActionArea} from '@material-ui/core'

const styles = {
  card: {
    margin: '10px',
    maxWidth: '500px',
    height: 'fit-content',
    padding: '20px',
  },
  link: {
    textAlign: 'right',
  },
}
const Quote = () => {
  const [quote, setQuote] = useState()

  // can't be a pure function since it calls setQuote(), so it has to be inside of a useCallback()
  const fetchQuote = useCallback(() => {
    fetch('https://www.leftist-quotes.com/')
      .then((response) => response.json())
      .then((data) => setQuote(data))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    fetchQuote()
  }, [fetchQuote])

  if (!quote) return null
  return (
    <Card style={styles.card}>
      <CardActionArea onClick={fetchQuote}>
        <p className="quoteBody">{quote.body}</p>
        <br />
      </CardActionArea>
      <a href={quote.link}>
        <p style={styles.link}>{quote.attribution}</p>
      </a>
    </Card>
  )
}

export default Quote
