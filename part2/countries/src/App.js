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
          <tr><th>Name</th><th>show</th></tr>
        </thead>
        <tbody>
        {props.searchCountries.map((country, idx) => 
          (<tr key={idx}>
            <td>{country.name.common}</td>
            <td><button onClick={() => {props.setSelectCountry(idx)}}>Show</button></td>
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
  const [ selectCountry, setSelectCountry ] = useState(-1)
  const [ weather, setWeather ] = useState({})
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
    if(searchCountries.length === 1) {
      axios
        .get('http://api.weatherstack.com/current?access_key=5aad7d5aac58eb7c73bd553af4805a68&query='+searchCountries[0].name.common)
        .then((response) => {
          console.log(response.data)
          setWeather(response.data)
        })
    }
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
              <div>
                <Country country={searchCountries[0]}/>
                {weather && weather.current ? 
                  <div>
                    <h2>Weather in {searchCountries[0].name.common}</h2>
                    <div>temperature: {weather.current.temperature}</div>
                    <div>wind: {weather.current.wind_speed} mph {weather.current.wind_dir} {weather.current.wind_degree} °</div>
                    <img src={weather.current.weather_icons[0]} alt="weather icon"></img>
                  </div> : ""
                }
              </div> :
                searchCountries.length >= 10 ? 
                  <div>Too many matches, specify another filter</div> :
                  <div>
                    <Countries searchCountries={searchCountries} setSelectCountry={setSelectCountry} />
                    {selectCountry>=0 ? <Country country={searchCountries[selectCountry]} /> : ""}
                  </div>
      }
    </div>
  )
}

export default App