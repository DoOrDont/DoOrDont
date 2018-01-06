import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import $ from 'jquery';
import List from './components/List.jsx';
import dumbyData from '../../database-mysql/helpers/testData.js';
import LogInForm from './components/LogInForm.jsx';
import SignUpForm from './components/SignUpForm.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      goals: [],
      cookie: null
    };
  }

  incrementGoal(goalIndex) {
    let newState = this.state.goals.slice();
    newState[goalIndex].counter += 1;
    this.setState({goals: newState});
  }

  editGoal(newGoal) {
    //TODO: change goal
  }

  deleteGoal(goalInex) {
    //TODO: delete goal
    const deletedGoal = this.state.goals;
    const newState = this.state.goals.slice(0, goalIndex).concat(this.state.goals.slice(goalIndex + 1));
    $.ajax({
      url: '/goals',
      method: 'PUT',
      data: JSON.stringify({action: 'delete', index: deletedGoal.id}),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: (data) => {
        this.setState({goals: newState});
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  componentDidMount() {
    $.ajax({
      url: '/', 
      success: (data) => {
        this.setState({
          goals: data
        });
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  submitCreds(credObj, url) {
    console.log('about to send post');
    let ajaxObj = {
      type: 'POST',
      url: url, 
      data: JSON.stringify(credObj),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: (data) => {
        this.setState({
          cookie: data
        });
      },
      error: (err) => {
        console.log('err', err);
      }
    }
    $.ajax(ajaxObj);  
  }

  render () {
    if(this.state.cookie === null){
      return (
        <MuiThemeProvider>
          <LogInForm submitCreds={this.submitCreds.bind(this)}/>
        {/*<SignUpForm submitCreds={this.submitCreds.bind(this)}/>*/}
        </MuiThemeProvider>
      )
    } else {
      return (
        <MuiThemeProvider>
          <div>
            <h1>Item List</h1>
            {/* the below line is set to pull test data, change to 
            this.state.goals when no longer needing dummy data*/}
            <List goals={this.props.goals} incrementGoal={this.incrementGoal.bind(this)}
            editGoal={this.editGoal.bind(this)} deleteGoal={this.deleteGoal.bind(this)}/>
          </div>
        </MuiThemeProvider>
      )
    }
  }
}

ReactDOM.render(<App goals={dumbyData.dumbyGoals}/>, document.getElementById('app'));