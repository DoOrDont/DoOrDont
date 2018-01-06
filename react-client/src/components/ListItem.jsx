import React from 'react';

const ListItem = (props) => (
  <div>
    <span>{ props.goal.description }</span>
<<<<<<< HEAD
    <button onClick={() => {props.editGoal()}}>Edit</button>
=======
    <button onClick={}>Edit</button>
>>>>>>> 1ffad416855d1e2d2dc105c66b5547260cceaa0d
    <button onClick={() => {props.incrementGoal(props.index)}}>Incrememt</button>
    <button onClick={() => {props.deleteGoal(props.index)}}>Delete</button>
  </div>
)

export default ListItem;