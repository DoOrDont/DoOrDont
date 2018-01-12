import React from 'react';
import ListItem from './ListItem.jsx';
import $ from 'jquery';
import dumbyData from './testData.js';
import { Link } from 'react-router-dom';
import { RaisedButton, TextField } from 'material-ui';
const axios = require('axios');
const jwtDecode = require('jwt-decode');



class List extends React.Component {
  
   constructor(props) {
    super(props);
    this.state = { 
      goals: dumbyData.dumbyGoals,
      token: null
    };
  }

  incrementGoal(goalIndex) {
    let incrementedGoal = this.state.goals[goalIndex];
    $.ajax({
      url: '/goals',
      method: 'PUT',
      data: JSON.stringify({ action: 'increment', goalId: incrementedGoal.id }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: (data) => {
        console.log('Goals:', this.state.goals);
        let newState = this.state.goals.slice();
        newState[goalIndex].counter += 1;
        this.setState({goals: newState});
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  editGoal(newGoal) {
    //TODO: change goal
  }

  deleteGoal(goalIndex) {
    //TODO: delete goal
    const deletedGoal = this.state.goals[goalIndex];
    $.ajax({
      url: '/goals',
      method: 'PUT',
      data: JSON.stringify({action: 'delete', goalId: deletedGoal.id}),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: (data) => {
        const newState = this.state.goals.slice(0, goalIndex).concat(this.state.goals.slice(goalIndex + 1));
        this.setState({goals: newState});
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  componentDidMount() {
    const goalId = window.localStorage.getItem('newestGoalId');
    let tokenObj = jwtDecode(window.sessionStorage.getItem('accessToken'));
    $.ajax({
      url: '/goals/' + tokenObj.username,
      success: (data) => {
        if(goalId && data.length) {
          data[data.length - 1].goalId = Number(goalId);
          window.sessionStorage.removeItem('newestGoalId');
        }
        this.setState({
          goals: data
        });
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }
  
  render () {
    return (
      <div>
        <Link to="/login">
          <RaisedButton>
            Sign Out
          </RaisedButton>
        </Link>
        <h4> Your goals: </h4>
          You currently have { this.state.goals.length } goals.
          <ul>
          { this.state.goals.map((goal, index) => (
            <ListItem 
              goal={goal} 
              key={index} 
              index={goal.goalId || index} 
              incrementGoal={this.incrementGoal.bind(this)} 
              editGoal={this.editGoal.bind(this)} 
              deleteGoal={this.deleteGoal.bind(this)}
            />
          ))}
          </ul>
        <br/><br/>
        <Link to="/creategoal">
          <RaisedButton>
            Create a Goal
          </RaisedButton>
        </Link>
      </div>
    )
  }
  
}
export default List;

