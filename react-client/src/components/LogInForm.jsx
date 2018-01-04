import React from 'react';
import Button from 'material-ui';

class LogInForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '', 
      password: ''
    };
  } 

  render(){
    <div>
      <h2>Login</h2>
      <form action="/login" method="post">
          <div>
            <label for="username">Username:</label>
            <input id="username" type="text" name="username"/>
          </div>
          <div>
            <label for="password">Password:</label>
            <input id="password" type="password" name="password"/>
          </div>
          <div>
            <Button onClick={props.submitCreds({})} value="Login"/>
          </div>
      </form>
      <p>
        <a href="/signup">Create an Account &rarr;</a>
      </p>
    </div>
} 


export default LogInForm;