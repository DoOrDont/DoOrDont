import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { RaisedButton, TextField, DropDownMenu } from 'material-ui';
const jwtDecode = require('jwt-decode');

class CreateGoal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      punishment: '',
      initiate: true,
      frequency: '',
      submitted: false
    };

    this.changeRoute = {
      'description': (value) => this.setState({description: value}),
      'punishment': (value) => this.setState({punishment: value}),
      'initiate': (value) => this.setState({initiate: value}),
      'frequency': (value) => this.setState({frequency: value})
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    window.localStorage.setItem('goalObj', '{}');
  }

  handleInputChange(stateKey, event) {
    console.log(this.state);
    this.changeRoute[stateKey](event.target.value);
  }

  handleSubmit(e) {
    console.log('Form submitted');
    //TODO: move user to punishment
    let goalObj = JSON.parse(window.localStorage.getItem('goalObj'));
    let token = window.sessionStorage.getItem('accessToken');
    let tokenObj = jwtDecode(token);
    goalObj.username = tokenObj.username;
    goalObj.description = this.state.description;
    goalObj.initiate = this.state.initiate;
    goalObj.frequency = this.state.frequency;
    window.sessionStorage.setItem('goalObj', JSON.stringify(goalObj));
    this.setState({ submitted: true })
    e.preventDefault();

  }

  render() {
    return (
      
      <div>
        {this.state.submitted === true ? <Redirect to="/punishment" /> : ''}
        <form onSubmit={this.handleSubmit}>
          <h1>I want to
          <select onChange={(e) => this.handleInputChange('initiate', e)}>
            <option value={true}>start</option>
            <option value={false}>quit</option>
          </select>
          <TextField type="text" value={this.state.description} onChange={(e) => this.handleInputChange('description', e)} />
          
          at least
          <TextField type="number" value={this.state.frequency} 
          onChange={(e) => this.handleInputChange('frequency', e)}/> times a week.
          </h1> <br/>

          <RaisedButton label="Next" onClick={this.handleSubmit}/>

          {/* My punishment will be:
          <input type="text" value={this.state.punishment} 
          onChange={(e) => this.handleInputChange('punishment', e)} /> */}
        </form>
        <Link to="/">
          <button type="button">
            Cancel
          </button>
        </Link>
      </div>
    )
  }
}

export default CreateGoal;