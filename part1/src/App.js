import React, { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  return (
    <div>
      <h1>Statistics</h1>
      <div>good: {good}</div>
      <div>neutral: {neutral}</div>
      <div>bad: {bad}</div>
      <div>all: {good+neutral+bad}</div>
      <div>average: {(good - bad) / (good + neutral + bad)}</div>
      <div>postive: {(good + neutral) / (good + neutral + bad) * 100} %</div>
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
      <button onClick={() => setGood(good+1)}>good</button>
      <button onClick={() => setNeutral(neutral+1)}>neutral</button>
      <button onClick={() => setBad(bad+1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App