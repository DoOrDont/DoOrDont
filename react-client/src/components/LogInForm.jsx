import React from 'react';
import FlatButton from 'material-ui/FlatButton';

export default class LogInForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '', 
      password: ''  
    };
  } 

  setUserName(){
    this.setState({userName: e.target.value});
  }

  setPassword(){
    this.setState({password: e.target.value});
  }

  render(){
    return (
      <div>
        <h2>Login</h2>
        <form action="/login" method="post">
            <div>
              <label htmlFor="username">Username:</label>
              <input 
                id="username" 
                onChange={this.setUserName} 
                value={this.state.userName} 
                type="text" 
                name="username"
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input 
                id="password" 
                onChange={this.setPassword} 
                value={this.state.password} 
                type="password" 
                name="password"/>
            </div>
            <div>
              <FlatButton
                onClick={
                  this.props.submitCreds(
                    {
                      userName: this.state.userName,
                      password: this.state.password
                    }
                  )
                } 
                value="Login"
              > Login
              </FlatButton>
            </div>
        </form>
        <p>
          <a href="/signup">Create an Account &rarr;</a>
        </p>
      </div>
    )
  }
} 


