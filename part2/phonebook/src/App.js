import React, { useEffect, useState } from 'react'
import phonebookServeice from './services/phonebook'

const Filter = (props) => {
  return (
    <div>
        filter show with <input onChange={(event) => (props.setFilter(event.target.value))} value={props.filter} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addNote}>
        <div>
          name: <input onChange={(event)=>{props.setNewName(event.target.value)}} value={props.newName} />
        </div>
        <div>
          number: <input onChange={(event) => (props.setNewNumber(event.target.value))} value={props.newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = (props) => {
  return (
    <div>
      <table>
        <thead>
          {/* <tr><th>Your PhoneBook</th></tr> */}
          <tr><th>Name</th><th>Number</th></tr>
        </thead>
        <tbody>
        {props.searchPersons.map((person) => 
          (<tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.number}</td>
            </tr>)
        )}
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [ searchPersons, setSearchPersons ] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  useEffect(() => {
    phonebookServeice
      .getAll()
      .then((phonebookdata) => {
        setPersons(phonebookdata)
      })
  }, [])
  useEffect(() => {
    setSearchPersons(persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase())))
  }, [filter, persons])
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
        number: newNumber,
        id: persons.length+1
      }
      phonebookServeice.create(newObj).then(() => {
        setPersons(persons.concat(newObj))
        setNewName("")
        setNewNumber("")
      })
      
    } else {
      window.alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {/* <div>debug: {newName}</div> */}
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add New</h2>
      <PersonForm setNewName={setNewName} newName={newName} setNewNumber={setNewNumber} newNumber={newNumber} addNote={addNote} />
      <h2>Numbers</h2>
      <Persons searchPersons={searchPersons} />
    </div>
  )
}

export default App