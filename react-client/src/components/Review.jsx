import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FlatButton, RaisedButton, Paper } from 'material-ui';
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
          let goalObj = JSON.parse(window.localStorage.getItem('goalObj'));
          goalObj.email = goalObj.username;
          goalObj.goalId = goalId;
          this.handleSuccess();
          
          return goalObj;
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

    const style = {
      height: '10vh',
      width: '80vw',
      margin: '30px',
      padding: '-15px 10px 15px 10px',
      textAlign: 'center',
      display: 'inline-block',
    };

    return (
      <div>
        {this.state.success === true ? <Redirect to="/" /> : ''}
        <div id="goal-freq">
          <Paper style={style}>
            <h2>I want to {this.state.goal.initiate === true ? 'start' : 'quit'} {this.state.goal.description} 
                &nbsp;at least {this.state.goal.frequency} times a week.
            </h2>
          </Paper>
        </div>
        <div id="goalPunishment">
          <h3>If I don't accomplish this, Do Or Don't will {this.state.goal.punishment === 'email' ? 'send me a motivational email to get me back on track.' : 'tweet at my Twitter account for all my followers to see.'}</h3>
        </div>
        <div id="submission">
          <Link to="/">
            <FlatButton>
              Cancel
            </FlatButton>
          </Link>
          <RaisedButton onClick={this.handleReviewSubmit}>Submit</RaisedButton>
        </div>
      </div>
    )
  }  
}

export default Review;