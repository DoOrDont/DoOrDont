import React from 'react';
import { RaisedButton, TextField } from 'material-ui';
import { Redirect } from 'react-router';

import { Link } from 'react-router-dom';
import helpers from '../helpers.jsx';

export default class LogInForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '', 
      password: ''
    };
  } 

  setUsername(e) {
    this.setState({username: e.target.value});
  }

  setPassword(e) {
    this.setState({password: e.target.value});
  }
  
  render(){
    return (
      <div>
        <h2>Login</h2>
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
            <RaisedButton
              onClick={  () => (
                helpers.submitCreds(
                  {
                    username: this.state.username,
                    password: this.state.password
                  },
                  '/login'
                )
              )} 
              value="Login"
            > Login
            </RaisedButton>
          </div>
          <Link to="/signup">
            <RaisedButton>
              Create an Account
            </RaisedButton>
          </Link>
      </div>
    );
  }
} 


