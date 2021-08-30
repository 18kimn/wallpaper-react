import {useState} from 'react'
import {Card, TextField} from '@material-ui/core'
import {Icon} from '@iconify/react'
import pushpinFilled from '@iconify/icons-ant-design/pushpin-filled'
import pushpinOutlined from '@iconify/icons-ant-design/pushpin-outlined'
import closeBig from '@iconify/icons-ci/close-big'
// create post-it surfaces
// clicking 'pin' submits the data to firestore and brings in a new post-it
// dragging any surface to the trash can area deletes it from the database
// show little popup saying 'message submitted'!

// surface for the guestbook actions
// has a state of either editable or not editable

const Postcard = (props) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isEditable, setIsEditable] = useState(props.editable)
  const [position, setPosition] = useState(props.position || [50, 50])

  const [message, setMessage] = useState(props.message || '')
  const handleInput = (e) => {
    if (!isEditable) return
    setMessage(e.target.value)
  }

  const handleDrag = (e) => {
    if (!isDragging || !isEditable) return
    const {pageX, pageY} = e
    const newX = (100 * pageX) / window.innerWidth
    const newY = (100 * pageY) / window.innerHeight
    setPosition([newX, newY])
  }

  const handleSubmit = () => {
    const [x, y] = position
    props.update({x, y, message, id: props.id})
    if (props.editable) {
      // if it received editable = true then it was the manipulable card
      // so after we submit it to firestore we should
      // give the impression of a new card being generated
      setPosition([50, 50])
      setMessage('')
      setIsEditable(true)
    } else {
      // otherwise, just toggle editability
      setIsEditable(!isEditable)
    }
  }

  return (
    <Card
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseMove={handleDrag}
      className="card"
      style={{top: `${position[1]}%`, left: `${position[0]}%`}}
    >
      <button onClick={handleSubmit} className="button">
        <Icon
          icon={isEditable ? pushpinOutlined : pushpinFilled}
          className="icon"
        />
      </button>
      {!props.editable ? (
        <button
          onClick={() => props.delete(props.id, props.editable)}
          className="button"
        >
          <Icon icon={closeBig} className="icon" />
        </button>
      ) : null}
      <TextField
        className="cardElement"
        disabled={!isEditable}
        label="type a message here"
        onKeyPress={handleInput}
        onChange={handleInput}
        multiline
        minRows={2}
        maxRows={Infinity}
        value={message}
        inputProps={{style: {fontFamily: 'Lato'}}}
      />
    </Card>
  )
}

export default Postcard
