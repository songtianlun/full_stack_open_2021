import React, { useEffect, useState } from 'react'
import phonebookServeice from './services/phonebook'

const ErrorNotification = ({message}) => {
  if (message === null) {
    return null
  }
  return (
    <div className='error'>
      {message}
    </div>
  )
}

const SuccessNotification = ({message}) => {
  if (message === null) {
    return null
  }
  return (
    <div className='succe'>
      {message}
    </div>
  )
}

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
            <td><button onClick={() => (props.deletePersonHandle(person.id))}>delete</button></td>
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
  const [ succeMessage, setSucceMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)
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
  const showSuccNotifi = (message) => {
    setSucceMessage(message)
    setTimeout(() => {
      setSucceMessage(null)
    }, 5000)
  }
  
  const showErrorNotifi = ({message}) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  const addNote = (event) => {
    let hasPerson = 0
    event.preventDefault()
    // console.log(event)
    persons.forEach((item) => {
      if (item.name === newName) {
        console.log(`has person, id:${item.id}`)
        hasPerson = item.id
      }
    })
    if (newName.length<1 || newNumber.length<1) {
      window.alert(`You must be to enter name and number`)
    } else if (hasPerson===0){
      const newObj = {
        name: newName,
        number: newNumber
      }
      phonebookServeice.create(newObj).then(() => {
        showSuccNotifi(`Added ${newName}`)
        setPersons(persons.concat(newObj))
        setNewName("")
        setNewNumber("")
      })
      
    } else {
      if (window.confirm(`${newName} (id:${hasPerson}) is already added to phonebook, replace the old number with a new one?`)){
        const newObj = {
          name: newName,
          number: newNumber,
          id: hasPerson
        }
        phonebookServeice.update(hasPerson, newObj).then((response) => {
          showSuccNotifi(`Update ${newName}`)
          setPersons(persons.map(p=>p.id!==hasPerson?p:response))
          setNewName("")
          setNewNumber("")
        }).catch((err)=>{
          console.log(`error to update: ${err}`)
        })
      }
      
    }
  }

  const deletePersonHandle = (id) => {
    const phone = searchPersons.find(n=>n.id===id)
    if (window.confirm(`Do you want to delete ${phone.name}`)){
      phonebookServeice.deletePerson(id).then(() => {
        console.log(` successful to delete ${phone.name}`)
        showSuccNotifi(` successful to delete ${phone.name}`)
        setPersons(persons.filter(person=>person.id!==id))
      })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <SuccessNotification message={succeMessage} />
      <ErrorNotification message={errorMessage} />
      {/* <div>debug: {newName}</div> */}
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add New</h2>
      <PersonForm setNewName={setNewName} newName={newName} setNewNumber={setNewNumber} newNumber={newNumber} addNote={addNote} />
      <h2>Numbers</h2>
      <Persons searchPersons={searchPersons} deletePersonHandle={deletePersonHandle} />
    </div>
  )
}

export default App