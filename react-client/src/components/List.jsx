import React from 'react';
import ListItem from './ListItem.jsx';
//todo add componentDidMount() for getting users goals
const List = (props) => (
  <div>
    <h4> List Component </h4>
    There are { props.goals.length } items.
    { props.goals.map((goal, index) => <ListItem goal={goal} key={index} index={index} 
    incrementGoal={props.incrementGoal} editGoal={props.editGoal} deleteGoal={props.deleteGoal}/>)}
  </div>
)

export default List;

