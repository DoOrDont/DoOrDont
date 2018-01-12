import React from 'react';

const ListItem = (props) => (
  <li>
    <div className="goalDescription">{ props.goal.description }</div>
    
    <div onClick={() => {props.editGoal()}}>
      <i className="editGoal fa fa-pencil" aria-hidden="true"></i>
    </div>
    
    <div onClick={() => {props.incrementGoal(props.index)}}>
      <i className="incrementGoal fa fa-plus" aria-hidden="true"></i>
    </div>

    <div onClick={() => {props.deleteGoal(props.index)}}>
      <i className="deleteGoal fa fa-trash" aria-hidden="true"></i>
    </div>

    

    
  </li>
)

export default ListItem;