import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0])

  const handleVote = (select) => {
    let newlist = [...points]
    newlist[selected] += 1
    setPoints(newlist)
  }

  const getMaxVoteIdx = (points) => {
    let max = 0
    let maxIdx = 0
    points.forEach((item, index) => {
      if(item > max) {
        max = item
        maxIdx = index
      }
    })
    return maxIdx
  }

  const MaxAnecdotes = ({points}) => {
    return (
      <div>
        <h1>Anecdotes with most votes</h1>
        <div>{anecdotes[getMaxVoteIdx(points)]}</div>
      </div>
    )
  }
  
  return (
    <div>
      <h1>Anecdotes of the day</h1>
      {anecdotes[selected]} <br />
      <div>has {points[selected]} votes</div>
      <button onClick={() => (handleVote(selected))}>Vote</button>
      <button onClick={() => {setSelected(Math.floor(Math.random()*6))}}>Next</button>
      <br />
      <MaxAnecdotes points={points} />
    </div>
  )
}

export default App