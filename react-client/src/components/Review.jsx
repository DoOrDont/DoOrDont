import React from 'react';
import { Link } from 'react-router-dom';
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
    let goal = JSON.parse(sessionStorage.getItem('goalObj'));
    this.setState('goal', goal);
  }


  handleReviewSubmit(e) {
    axios.post('/goals', this.state.goal)
      .then(function(response) {
        if (response.status === 200) {
          console.log(response);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div id="goal-freq">
          <h2>I want to {this.state.goal.description} 
              at least {this.state.goal.frequency} times a week.
          </h2>
        </div>
        <div id="goal-punishment">
          <h3>If I don't accomplish this, Do Or Don't will 
            {if (this.state.goal.punishment === 'email') {
              return (`<h3>
                        send me a motivational email to get me back on track.
                      </h3>`);
            } else if (this.state.goal.punishment === 'twitter') {
              return (`<h3>
                        post a tweet on my Twitter account for all my followers to see.
                      </h3>`);
            }}
          </h3>
        </div>
        <div id="submission">
          <Link to="/">Cancel</Link>
          <Link to="/">
            <RaisedButton onClick={this.handleReviewSubmit}>
              Submit
            </RaisedButton>
          </Link>
        </div>
      </div>
    )
  }  
}

export default Review;