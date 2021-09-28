import React from "react";

const Header = (props) => {
    console.log(props)
    return (<h1>{props.course}</h1>)
  }
  const Content = (props) => {
    return (
      <div>
        <Part part={props.parts[0].name} exercises={props.parts[0].exercises}/>
        <Part part={props.parts[1].name} exercises={props.parts[1].exercises}/>
        <Part part={props.parts[2].name} exercises={props.parts[2].exercises}/>
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
      <p>Number of exercises {props.exercises}</p>
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
            <Total exercises={courses.parts[0].exercises + courses.parts[1].exercises + courses.parts[2].exercises}/>
        </div>
    )
}

export default Course