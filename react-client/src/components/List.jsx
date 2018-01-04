import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> List Component </h4>
    There are { props.goals.length } items.
    { props.goals.map(goal => <ListItem goal={goal}/>)}
  </div>
)

export default List;