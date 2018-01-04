import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import dumbyData from '../../database-mysql/helpers/testData.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      goals: []
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

  render () {
    return (<div>
      <h1>Item List</h1>
    {/* the below line is set to pull test data change to 
    this.state.goals when no longer needing dummy data*/}
      <List goals={this.props.goals}/>
    </div>)
  }
}

ReactDOM.render(<App goals={dumbyData.dumbyGoals}/>, document.getElementById('app'));