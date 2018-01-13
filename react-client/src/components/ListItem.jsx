import React from 'react';
import dummy from './testData.js';
import { LinearProgress } from 'material-ui';

class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: (this.props.counter / this.props.frequency) * 100
    };
  }

  render() {

    const style = {
      'width': '86vw'
    };

    return(
      <div className="item">
        <li>
          <div className="goalDescription">{ this.props.goal.description }</div>
          
          <div className="icons">
            <div onClick={() => {this.props.editGoal()}}>
              <i className="editGoal fa fa-pencil" aria-hidden="true"></i>
            </div>
            
            <div onClick={() => {this.props.incrementGoal(this.props.index)}}>
              <i className="incrementGoal fa fa-plus" aria-hidden="true"></i>
            </div>

            <div onClick={() => {this.props.deleteGoal(this.props.index)}}>
              <i className="deleteGoal fa fa-trash" aria-hidden="true"></i>
            </div>
          </div>
        </li>

        <LinearProgress id="progress-bar" 
                        mode="determinate" 
                        value={this.state.progress} 
                        color='#454545' 
                        style={style} />
      </div>
    );
  }
}

export default ListItem;