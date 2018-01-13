import React from 'react';
import AppBar from 'material-ui/AppBar';

const navStyle = {
  'backgroundColor': '#FFFFFF',
  'width': '100vw'
};

const AppBarNav = () => (
  <AppBar
    title="Do || Dont"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
    style={navStyle}
  />
);

export default AppBarNav;
