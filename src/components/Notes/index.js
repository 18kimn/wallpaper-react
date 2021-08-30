import './Notes.css'
import React, {useState, useEffect} from 'react'
import {initializeApp} from 'firebase/app'
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import Postcard from './Postcard'

const firebaseConfig = {
  apiKey: 'AIzaSyB1UUFi6J3-_2BRE06qTVbxrw3TZgXC874',
  authDomain: 'blog-99efa.firebaseapp.com',
  projectId: 'blog-99efa',
  storageBucket: 'blog-99efa.appspot.com',
  messagingSenderId: '179354454856',
  appId: '1:179354454856:web:170649d30c5f510bcdc17d',
  measurementId: 'G-G18EWH3KDE',
}

initializeApp(firebaseConfig)
const gb = getFirestore()
const messageCollection = collection(gb, 'notes')

const Notes = () => {
  const [archive, setArchive] = useState(undefined)

  const updater = ({x, y, message, id}) => {
    if (typeof id === 'undefined') {
      addDoc(messageCollection, {x, y, message})
    } else {
      updateDoc(doc(gb, 'notes', id), {x, y, message})
    }
  }
  const deleter = (id, editable) => {
    if (!editable) deleteDoc(doc(gb, 'messages', id))
  }

  //  archive should be updated with the changed data
  useEffect(() => {
    const unsubscribe = onSnapshot(messageCollection, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const {doc, type} = change

        setArchive((prevArchive) => {
          if (typeof prevArchive === 'undefined') return snapshot.docs
          const archiveCopy = [...prevArchive] // to force a reference change and state rerender
          const index = archiveCopy.map((d) => d.id).indexOf(doc.id)
          switch (type) {
            case 'added':
              archiveCopy.push(doc)
              break
            case 'modified':
              archiveCopy[index] = doc
              break
            case 'removed':
              archiveCopy.splice(index, 1)
              break
            default:
              break
          }
          console.log(archiveCopy)
          return archiveCopy
        })
      })
    })
    return () => unsubscribe()
  }, [])

  return (
    <>
      <Postcard editable update={updater} delete={deleter} />
      {typeof archive != 'undefined' &&
        archive.map((doc) => {
          const {x, y, message} = doc.data()
          return (
            <Postcard
              key={doc.id}
              id={doc.id}
              position={[x, y]}
              message={message}
              update={updater}
              delete={deleter}
            />
          )
        })}
    </>
  )
}

export default Notes
