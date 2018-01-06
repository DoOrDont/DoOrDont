import React from 'react';
import { RaisedButton, TextField } from 'material-ui';

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
              onClick={ () => (
                this.props.submitCreds( 
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
        <p>
          <a href="/signup">Create an Account &rarr;</a>
        </p>
      </div>
    )
  }
} 


