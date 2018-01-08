import React from 'react';
import { RaisedButton, TextField } from 'material-ui';
import $ from 'jquery';
import { Link } from 'react-router-dom';

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
  
  submitCreds(credObj, url) {
    console.log('about to send post');
    let ajaxObj = {
      type: 'POST',
      url: url, 
      data: JSON.stringify(credObj),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: (data) => {
        console.log(data);
        // this.setState({
        //   cookie: data
        // });
      },
      error: (err) => {
        console.log('err', err);
      }
    }
    $.ajax(ajaxObj);  
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


