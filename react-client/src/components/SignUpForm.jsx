import React from 'react';
import { RaisedButton, TextField } from 'material-ui';

export default class SignUpForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '', 
      password: '',
      password2: ''  
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

  render(){
    return (
      <div>
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
              onClick={ () => (
                this.props.submitCreds( 
                  {
                    'username': this.state.username,
                    'password': this.state.password
                  },
                  '/signup'
                )
              )} 
              value="SignUp"
            > Sign up
            </RaisedButton>
          </div>
      </div>
    )
  }
} 


