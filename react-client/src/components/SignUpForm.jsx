import React from 'react';
import { RaisedButton, FlatButton, TextField, Dialog } from 'material-ui';
import $ from 'jquery';
import { Link, Redirect } from 'react-router-dom';
const axios = require('axios');

export default class SignUpForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '', 
      password: '',
      password2: '',
      open: false,
      signedIn: false
    };
  } 

  setUsername(e) {
    this.setState({username: e.target.value});
  }

  setPassword(e) {
    this.setState({password: e.target.value});
  }

   setPassword2(e) {
    this.setState({password2: e.target.value});
  }

  handleOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
  };
  
  submitCreds(credObj, url) {
    if(!(this.state.username && this.state.password)) {
      this.handleOpen();
    } else {
      axios.post(url, credObj)
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            this.setState({ signedIn: true });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  render(){

    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onClick={this.handleClose.bind(this)}
      />,
    ];

    return (
      <div>
        {this.state.signedIn === true ? <Redirect to="/" /> : ''}
        <Dialog
          title="Blank Username or Password"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          Both Username and Password cannot be blank.
        </Dialog>

        <h2>Sign Up</h2>
          <div>
            <TextField
              hintText="Username"
              id="username" 
              onChange={this.setUsername.bind(this)} 
              value={this.state.username} 
              type="text" 
              name="username"
            />
          </div>
          <div>
            <TextField
              hintText="Password" 
              id="password" 
              onChange={this.setPassword.bind(this)} 
              value={this.state.password} 
              type="password" 
              name="password"/>
          </div>
          <div>
            <TextField
              hintText="Re-enter Password" 
              id="password2" 
              onChange={this.setPassword2.bind(this)} 
              value={this.state.password2} 
              type="password" 
              name="password"/>
          </div>
          <div>
            <RaisedButton
              onClick={  () => (
                this.submitCreds(
                  {
                    username: this.state.username,
                    password: this.state.password
                  },
                  '/signup'
                )
              )} 
              value="Signup"
            > Sign up
            </RaisedButton>
          </div>
          <Link to="/login">
            <RaisedButton>
              Log In 
            </RaisedButton>
          </Link>
      </div>
    )
  }
} 


