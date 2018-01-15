import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { SelectField, RaisedButton, TextField, DropDownMenu, MenuItem, Dialog, FlatButton } from 'material-ui';
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

  handleInputChange(stateKey, event, index, val) {
    if(val !== undefined) {
      this.changeRoute[stateKey](val);
    } else {
      this.changeRoute[stateKey](event.target.value);
    }
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

    const style = {
      dropdown: {
        width: '17vw',
        fontSize: '1em',
        verticalAlign: 'bottom'
      }, 
      textfield: {
        borderColor: '#454545',
        fontSize: '1em'
      }
    }

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
          
          <h2 id="goal">I want to &nbsp;
          
          {/* <DropDownMenu 
            value={this.state.intiate} 
            autoWidth={false} style={style.dropdown} 
            onChange={(e, i, val) => this.handleInputChange('initiate', e, i, val)}>
              <MenuItem value={true} primaryText='start' />
              <MenuItem value={false} primaryText='quit' />
          </DropDownMenu> */}
          
          <SelectField
            value={this.state.initiate}
            onChange={(e, i, val) => this.handleInputChange('initiate', e, i, val)}
            style={style.dropdown}
            autoWidth={true}
            hintStyle={{fontSize: '1em'}}
            hintText={"Start/Quit"}
          >
              <MenuItem value={true} primaryText='start' />
              <MenuItem value={false} primaryText='quit' />
          </SelectField> &nbsp;

          <TextField 
            id="goal"
            type="text" 
            hintText="going to the gym"
            value={this.state.description} 
            style={style.textfield}
            underlineFocusStyle={style.textfield} 
            onChange={(e) => this.handleInputChange('description', e)} /> at least &nbsp;

          <TextField 
            id="frequency"
            type="number" 
            hintText="5"
            value={this.state.frequency} 
            style={style.textfield}
            underlineFocusStyle={style.textfield}
            onChange={(e) => this.handleInputChange('frequency', e)}/> times a week.
          </h2> <br/>

          <RaisedButton label="Next" onClick={this.handleSubmit}/>

          {/* My punishment will be:
          <input type="text" value={this.state.punishment} 
          onChange={(e) => this.handleInputChange('punishment', e)} /> */}
        </form>
        <Link to="/">
          <FlatButton>
            Cancel
          </FlatButton>
        </Link>
      </div>
    )
  }
}

export default CreateGoal;