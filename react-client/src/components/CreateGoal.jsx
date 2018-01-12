import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { RaisedButton, TextField, DropDownMenu, Dialog, FlatButton } from 'material-ui';
const jwtDecode = require('jwt-decode');

class CreateGoal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      punishment: '',
      initiate: 'true',
      frequency: '',
      submitted: false,
      open: false,
      errorTitle: '',
      errorBody: ''
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
    console.log('STATE:', this.state);
    if(this.state.description.length && this.state.frequency.length) {
      let goalObj = JSON.parse(window.localStorage.getItem('goalObj'));
      let token = window.localStorage.getItem('accessToken');
      let tokenObj = jwtDecode(token);
      goalObj.username = tokenObj.username;
      goalObj.description = this.state.description;
      goalObj.initiate = this.state.initiate;
      goalObj.frequency = this.state.frequency;
      window.localStorage.setItem('goalObj', JSON.stringify(goalObj));
      this.setState({ submitted: true })
    } else {
      this.showError('Empty Fields', 'Goal description and frequency cannot be empty');
    }
    e.preventDefault();
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  showError(errorTitle, errorBody) {
    this.setState({
      errorTitle: errorTitle,
      errorBody: errorBody
    }, () => {
      this.handleOpen();
    });
  }

  render() {

    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onClick={this.handleClose.bind(this)}
      />,
    ];

    return (
      <div>
        <Dialog
          title={this.state.errorTitle}
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          {this.state.errorBody}
        </Dialog>

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