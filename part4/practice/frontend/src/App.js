import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const Notification = ({message}) => {
  if (message === null) {
    return null
  }
  return (
    <div className='error'>
      {message}
    </div>
  )
}

const Footer = () => {
  const footerStyle = {
    color: `green`,
    fontStyle: `italic`,
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2021</em>
    </div>
  )
}

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("a new note...")
  const [showAll, setShowAll] = useState(true)
  const [ errorMessage, setErrorMessage ] = useState(null)

  const toggleImportanceOf = (id) => {
    console.log(`importance of ${id} needs to be toggled`)
    const note = notes.find(n => n.id === id)
    const changeNote = { ...note, important: !note.important }
    noteService.update(id, changeNote).then((returnNote)=>{
      setNotes(notes.map(note=>note.id !== id ? note : returnNote))
    })
    .catch(err => {
      // alert(
      //   `the note ${note.content} was already deleted from server`
      // )
      setErrorMessage(
        `The note ${note.content} was error importance from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  useEffect(() => {
    noteService
      .getAll()
      .then((response => {
        console.log('promise fulfilled')
        setNotes(response)
      }))
  }, [])
  console.log('render', notes.length, 'notes')
  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
    noteService
      .create(noteObject)
      .then(returnNote => {
        console.log(returnNote)
        setNotes(notes.concat(returnNote))
        setNewNote('')
      })
    
  }
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  const notesToShow = showAll 
    ? notes 
    : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note} 
            toggleImportanceOf={() => (toggleImportanceOf(note.id))}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App