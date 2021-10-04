import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const addNote = (event) => {
    event.preventDefault()
    console.log(event)
    const newObj = {
      name: newName
    }
    setPersons(persons.concat(newObj))
    setNewName("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {/* <div>debug: {newName}</div> */}
      <form onSubmit={addNote}>
        <div>
          name: <input onChange={(event)=>{setNewName(event.target.value)}} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
          (<h3>{person.name}</h3>)
        )}
    </div>
  )
}

export default App