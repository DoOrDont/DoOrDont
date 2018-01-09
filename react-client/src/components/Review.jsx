import React from 'react';
import { Link } from 'react-router-dom';
import { RaisedButton, TextField } from 'material-ui';

class Review extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      goal: {},
      success: false
    };

    this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
  }

  componentDidMount() {
    let goal = JSON.parse(sessionStorage.getItem('goalObj'));
    this.setState('goal', goal);
  }


  handleReviewSubmit(e) {
    $.ajax({
      type: 'POST',
      url: url,
      data: {goal: this.state.goal},
      success: success,
    });
  }

  handleSuccess() {
    this.setState({success: true});
  }

  render() {
    return (
      <div>
        <div id="goalFreq">
          <h2>I want to {this.state.goal.description} 
              at least {this.state.goal.frequency} times a week.
          </h2>
        </div>
        <div id="goalPunishment">
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
          <a href='/'>Cancel</a>
          <RaisedButton onClick={this.handleReviewSubmit}>Submit</RaisedButton>
      </div>
    

    )
  }
}

export default Review;