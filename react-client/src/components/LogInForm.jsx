import React from 'react';
import { RaisedButton, TextField } from 'material-ui';
import { Redirect } from 'react-router';

import { Link } from 'react-router-dom';
import helpers from '../helpers.jsx';

export default class LogInForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '', 
      password: ''
    };
  } 

  setUserName(e) {
    this.setState({userName: e.target.value});
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
              onChange={this.setUserName.bind(this)} 
              value={this.state.userName} 
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
                    userName: this.state.userName,
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


