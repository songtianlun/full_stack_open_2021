import React, { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  return (
    <div>
      <h1>Statistics</h1>
      {(good + neutral + bad > 0 && 
        <table>
        <tr>
          <td>good</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{bad}</td>
        </tr>
        <tr>
          <td>all</td>
          <td>{good+neutral+bad}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{(good - bad) / (good + neutral + bad)}</td>
        </tr>
        <tr>
          <td>postive</td>
          <td>{(good + neutral) / (good + neutral + bad) * 100} %</td>
        </tr>
      </table>)
      || <div>no feedback given</div>
      }
    </div>
  )
}

const Average = ({good, neutral, bad}) => {
  return (
    <div>average: {(good - bad) / (good + neutral + bad)}</div>
  )
}

const FeedBackButtons = ({setGood, setNeutral, setBad, good, neutral, bad}) => {
  return (
    <div>
        <button onClick={() => setGood(good+1)}>good</button>
        <button onClick={() => setNeutral(neutral+1)}>neutral</button>
        <button onClick={() => setBad(bad+1)}>bad</button>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give FeedBack</h1>
      <FeedBackButtons setGood={setGood} setNeutral={setNeutral} setBad={setBad} good={good} neutral={neutral} bad={bad}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App