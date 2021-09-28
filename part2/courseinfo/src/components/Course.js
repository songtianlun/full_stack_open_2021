import React from "react";

const Header = (props) => {
    console.log(props)
    return (<h1>{props.course}</h1>)
  }
  const Content = (props) => {
    return (
      <div>
        {props.parts.map(part => <Part key={part.name} part={part.name} exercises={part.exercises}/>)}
      </div>
    )
  }
  const Part = (props) => {
    return (
      <p>
        {props.part} {props.exercises}
      </p>
    )
  }
  const Total = (props) => {
    return (
        // eslint-disable-next-line
      <p><b>Total of {eval((props.parts.map(part => part.exercises)).join("+"))} exercises</b></p>
    )
}

const Course = ({courses}) => {
    return (
        <div>
            <Header course={courses.name} />
            <Content 
                parts={courses.parts}
            >
            </Content>
            <Total parts={courses.parts} exercises={courses.parts[0].exercises + courses.parts[1].exercises + courses.parts[2].exercises}/>
        </div>
    )
}

export default Course