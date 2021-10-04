import React, { useEffect, useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [ searchPersons, setSearchPersons ] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  useEffect(() => {
    setSearchPersons(persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase())))
  }, [filter])
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
      <div>
        filter show with <input onChange={(event) => (setFilter(event.target.value))} value={filter} />
      </div>
      <h2>Add New</h2>
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
        {searchPersons.map((person) => 
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

export default App