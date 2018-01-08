import React from 'react';
import { RaisedButton, TextField } from 'material-ui';
import $ from 'jquery';
import { Link } from 'react-router-dom';

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

  submitCreds(credObj, url) {
    console.log('about to send post');
    let ajaxObj = {
      type: 'POST',
      url: url, 
      data: JSON.stringify(credObj),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: (data) => {
        let allCookies = document.cookie;
        console.log('data', data);
        console.log('cookies', allCookies);
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
                this.submitCreds(
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
            <button type="button">
              Create an Account
            </button>
          </Link>
      </div>
    );
  }
} 


