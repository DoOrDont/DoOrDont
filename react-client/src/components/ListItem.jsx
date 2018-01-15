import React from 'react';
import dummy from './testData.js';
import { LinearProgress } from 'material-ui';

class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0
    };
  }

  render() {

    const style = {
      'width': '86vw'
    };

    const completedStyle = {
      'textDecoration': 'line-through'
    };

    const incompleteStyle = {

    };


    return(
      <div className="item">
        <li >
          <div> 
            {this.props.goal.counter >= this.props.goal.frequency ?
             <i className="incrementGoal fa fa-check-square-o" aria-hidden="true"></i> : 
             <i className="incrementGoal fa fa-square-o" aria-hidden="true"></i>} 
          </div>&nbsp;
          <div style={this.props.goal.counter >= this.props.goal.frequency ? completedStyle : incompleteStyle} className="goalDescription">{ this.props.goal.description } ( { this.props.goal.counter } of { this.props.goal.frequency } )</div>&nbsp;
          <div className="icons">
            <div onClick={() => {this.props.incrementGoal(this.props.index)}}>
              <i className="incrementGoal fa fa-plus" aria-hidden="true"></i>
            </div>&nbsp;

            <div onClick={() => {this.props.deleteGoal(this.props.index)}}>
              <i className="deleteGoal fa fa-trash" aria-hidden="true"></i>
            </div>&nbsp;
          </div>
        </li>

        <LinearProgress id="progress-bar" 
                        mode="determinate" 
                        value={((this.props.goal.counter / this.props.goal.frequency * 100))} 
                        color='#454545' 
                        style={style} />
      </div>
    );
  }
}

export default ListItem;