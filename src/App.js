import './App.css'
import {useEffect} from 'react'
import runBackground from './anims/Background'
import drawEllipses from './anims/Ellipse'
import Calendar from './components/Calendar'
import Quote from './components/Quote.js'
import Notes from './components/Notes'

function App() {
  useEffect(() => {
    runBackground()
    drawEllipses()
  })

  return (
    <div className="App">
      <Calendar />
      <div className="quoteContainer">
        {/* used for alignment to bottom etc */}
        <Quote />
      </div>
      {/* doesn't need a container since position: absolute */}
      <Notes />
    </div>
  )
}

export default App
