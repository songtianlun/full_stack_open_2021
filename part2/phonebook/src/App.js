import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const addNote = (event) => {
    let hasPerson = false
    event.preventDefault()
    // console.log(event)
    const newObj = {
      name: newName
    }
    persons.forEach((item) => {
      if (item.name === newName) {
        console.log("has person")
        hasPerson = true
      }
    })
    if (!hasPerson){
      setPersons(persons.concat(newObj))
      setNewName("")
    } else {
      window.alert(`${newName} is already added to phonebook`)
    }
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
      {persons.map((person,index) => 
          (<div key={index}>{person.name}</div>)
        )}
    </div>
  )
}

export default App