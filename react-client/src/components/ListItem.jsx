import React from 'react';

const ListItem = (props) => (
  <div>
    <span>{ props.goal.description }</span>
    <button onClick={}>Edit</button>
    <button onClick={() => {props.incrementGoal(props.index)}}>Incrememt</button>
    <button onClick={() => {props.deleteGoal(props.index)}}>Delete</button>
  </div>
)

export default ListItem;