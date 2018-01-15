import React from 'react';
import AppBar from 'material-ui/AppBar';
import {Link} from 'react-router-dom';
import Subheader from 'material-ui/Subheader';
const jwtDecode = require('jwt-decode');


const navStyle = {
  'backgroundColor': '#FFFFFF',
  'width': '100vw'
};

const subheaderStyle = {
  paddingLeft: '0',
  fontSize: '1.2em'
};

const linkStyle = {
  textDecoration: 'none',

};

const AppBarNav = () => {
  let user;
  if(window.localStorage.getItem('accessToken') && window.location.pathname !== '/login') {
    user = jwtDecode(window.localStorage.getItem('accessToken')).username;
  }
  return (
    <div>
      <AppBar
        title="Do || Dont"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        style={navStyle}
        titleStyle={{color: '#000'}}
      />
      <Subheader style={subheaderStyle}>{user ? 'Hello, ' + user : ''}</Subheader>
    </div>
  );
}

export default AppBarNav;
