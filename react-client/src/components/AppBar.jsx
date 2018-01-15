import React from 'react';
import { AppBar, IconButton, NavigationClose, FlatButton } from 'material-ui';
import { Redirect, Link } from 'react-router-dom';
const jwtDecode = require('jwt-decode');


class AppBarNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false
    };

    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState({
      clicked: true
    });
  }


  render() {
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

    return (
      <div>
        {this.state.clicked === true ? <Link to="/" /> : ''}

        <AppBar
          title="Do or Don't"
          onTitleClick={this.handleClick}
          style={navStyle}
          titleStyle={{color: '#000'}}
          iconElementRight={<Link to="/login"><FlatButton label="Sign Out" /></Link>}
        />
      </div>
    );
  }
}

export default AppBarNav;
