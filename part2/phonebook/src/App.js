import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { 
      name: 'Arto Hellas',
      number: '+1(936)6662109'
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const addNote = (event) => {
    let hasPerson = false
    event.preventDefault()
    // console.log(event)
    persons.forEach((item) => {
      if (item.name === newName) {
        console.log("has person")
        hasPerson = true
      }
    })
    if (newName.length<1 || newNumber.length<1) {
      window.alert(`You must be to enter name and number`)
    } else if (!hasPerson){
      const newObj = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newObj))
      setNewName("")
      setNewNumber("")
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
          number: <input onChange={(event) => (setNewNumber(event.target.value))} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <table>
        <thead>
          {/* <tr><th>Your PhoneBook</th></tr> */}
          <tr><th>Name</th><th>Number</th></tr>
        </thead>
        <tbody>
        {persons.map((person,index) => 
          (<tr key={index}>
            <td>{person.name}</td>
            <td>{person.number}</td>
            </tr>)
        )}
        </tbody>
      </table>
    </div>
  )
}

export default App