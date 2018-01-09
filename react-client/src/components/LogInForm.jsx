import React from 'react';
import { RaisedButton, FlatButton, Dialog, TextField } from 'material-ui';
import { Redirect } from 'react-router';

import { Link } from 'react-router-dom';
// import helpers from '../helpers.jsx';
const axios = require('axios');

export default class LogInForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '', 
      password: '',
      open: false,
      signedIn: false
    };
  }

  submitCreds() {
    const that = this;
    const credObj = {username: this.state.username, password: this.state.password};
    const url = '/login';
    console.log('about to send post');
  
    if (!(this.state.username && this.state.password)) {
      this.handleOpen();
    } else {
      axios.post(url, credObj)
        .then((response) => {
          if (response.status === 200) {
            window.sessionStorage.accessToken = response.data.token;
            this.setState({signedIn: true});
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  componentDidMount() {
    window.sessionStorage.removeItem('accessToken');
  }

  setUsername(e) {
    this.setState({username: e.target.value});
  }

  setPassword(e) {
    this.setState({password: e.target.value});
  }

  handleOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
  };
  
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
              onClick={this.submitCreds.bind(this)} 
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


