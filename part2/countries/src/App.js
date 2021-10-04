import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div>
        find countries <input onChange={(event) => (props.setFilter(event.target.value))} value={props.filter} />
    </div>
  )
}

const Country = ({country}) => {
  return (
    <div>
      <h1>{country.flag} {country.name.common}</h1>
      <div>Captial: {country.capital[0]}</div>
      <div>Area: {country.area}</div>
      <div>Population: {country.population}</div>
      
      <img src={country.flags['png']} alt="flag"></img>
      
    </div>
  )
}

const Countries = (props) => {
  return (
    <div>
      <table>
        <thead>
          {/* <tr><th>Your PhoneBook</th></tr> */}
          <tr><th>Name</th><th>Number</th></tr>
        </thead>
        <tbody>
        {props.searchCountries.map((country, idx) => 
          (<tr key={idx}>
            <td>{country.name.common}</td>
            {/* <td>{country.number}</td> */}
            </tr>)
        )}
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [ searchCountries, setSearchCountries ] = useState(countries)
  const [ filter, setFilter ] = useState('')
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])
  useEffect(() => {
    setSearchCountries(countries.filter((country) => country.name.common.toLowerCase().includes(filter.toLowerCase())))
  }, [filter, countries])

  return (
    <div>
      <h1>Countries Book</h1>
      {/* <div>debug: {newName}</div> */}
      <Filter filter={filter} setFilter={setFilter} />
      {
        searchCountries.length === 0 ?
          <div>No country</div> :
            searchCountries.length === 1 ?
              <Country country={searchCountries[0]}/> :
                searchCountries.length >= 10 ? 
                  <div>Too many matches, specify another filter</div> :
                  <Countries searchCountries={searchCountries} />
      }
    </div>
  )
}

export default App