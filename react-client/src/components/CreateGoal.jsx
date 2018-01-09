import React from 'react';
import { Link } from 'react-router-dom';
import { RaisedButton, TextField } from 'material-ui';

class CreateGoal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      punishment: '',
      initiate: true,
      frequency: ''
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
    window.sessionStorage.setItem('goalObj', '{}');
  }

  handleInputChange(stateKey, event) {
    console.log(this.state);
    this.changeRoute[stateKey](event.target.value);
  }

  handleSubmit(e) {
    console.log('Form submitted');
    //TODO: move user to punishment
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          I want to 
          <select onChange={(e) => this.handleInputChange('initiate', e)}>
            <option value={true}>start</option>
            <option value={false}>quit</option>
          </select>
          <input type="text" value={this.state.description} onChange={(e) => this.handleInputChange('description', e)} />
          
          at least
          <input type="number" value={this.state.frequency} 
          onChange={(e) => this.handleInputChange('frequency', e)}/> times a week. <br/>

          <input type="submit" value="Next" />

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