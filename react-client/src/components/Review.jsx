import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { RaisedButton, TextField } from 'material-ui';
const axios = require('axios');

class Review extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      goal: {},
    };

    this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
  }

  componentDidMount() {
    let goal = JSON.parse(localStorage.getItem('goalObj'));
    this.setState({goal});
  }


  handleReviewSubmit(e) {
    axios.post('/goals', this.state.goal)
      .then((response) => {
        if (response.status === 200) {
          const goalId = response.data.goalId;
          window.localStorage.newestGoalId = goalId.toString();
          const email = JSON.parse(window.localStorage.getItem('goalObj')).username;
          this.handleSuccess();
          
          return {email, goalId};
        }
      })
      .then((goalInfo) => {
        return axios.post('/jobs', goalInfo);
      })
      .then((response) => {
        console.log('Job Started!');
      })
      .catch(function (error) {
        console.log(error);
      });
    e.preventDefault();
  }

  handleSuccess() {
    this.setState({success: true});
  }

  render() {
    return (
      <div>
        {this.state.success === true ? <Redirect to="/" /> : ''}
        <div id="goal-freq">
          <h2>I want to {this.state.goal.initiate === 'true' ? <h2>start</h2> : <h2>quit</h2>} {this.state.goal.description} 
              at least {this.state.goal.frequency} times a week.
          </h2>
        </div>
        <div id="goalPunishment">
          <h3>If I don't accomplish this, Do Or Don't will</h3>
          {this.state.goal.punishment === 'email' ? 
          <h3>send me a motivational email to get me back on track.</h3> :
          <h3>post a tweet on my Twitter account for all my followers to see.</h3>}
        </div>
        <div id="submission">
          <a href='/'>Cancel</a>
          <RaisedButton onClick={this.handleReviewSubmit}>Submit</RaisedButton>
        </div>
      </div>
    )
  }  
}

export default Review;