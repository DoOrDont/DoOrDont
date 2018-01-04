import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import dumbyData from '../../database-mysql/helpers/testData.js';
import LogInForm from './components/LogInForm.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      goals: [],
      cookie: null
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/items', 
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  submitCreds(credObj) {
    $.ajax({
      type: 'POST',
      url: '/login', 
      data: JSON.stringify(credObj),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: (data) => {
        this.setState({
          cookie: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });  
  }

  render () {
    if(this.state.cookie === null){
      return (
        <LogInForm submitCreds={this.submitCreds.bind(this)/>
      )
    } else {
      return (
        <div>
          <h1>Item List</h1>
          {/* the below line is set to pull test data, change to 
          this.state.goals when no longer needing dummy data*/}
          <List goals={this.props.goals}/>
        </div>
      )
    }
  }
}

ReactDOM.render(<App goals={dumbyData.dumbyGoals}/>, document.getElementById('app'));