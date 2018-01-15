import React from 'react';
import { AppBar, IconButton, NavigationClose, FlatButton } from 'material-ui';
import {Link} from 'react-router-dom';
import Subheader from 'material-ui/Subheader';
const jwtDecode = require('jwt-decode');

function handleClick() {
  alert('onClick triggered on the title component');
}

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

const styles = {
  title: {
    cursor: 'pointer',
  },
};

const AppBarNav = () => {
  let user;
  if(window.localStorage.getItem('accessToken') && window.location.pathname !== '/login') {
    user = jwtDecode(window.localStorage.getItem('accessToken')).username;
  }
  return (
    <AppBar
      title="Do or Don't"
      onTitleClick={handleClick}
      style={navStyle}
      titleStyle={{color: '#000'}}
      iconElementRight={<Link to="/login"><FlatButton label="Sign Out" /></Link>}
    />
  );
}

export default AppBarNav;
