import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle,
        CardText, GridList, GridTile, FlatButton, Dialog} from 'material-ui';
import {Redirect} from 'react-router-dom';
const axios = require('axios');
const jwtDecode = require('jwt-decode');


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
};

const cardStyles = {
  display: 'block',
  width: '30vw',
  maxWidth: '250px',
  transitionDuration: '0.3s',
  height: '45vw',
  maxHeight: '300px'
};

const punishments = [
  {
    title: 'twitter',
    icon: 'https://abs-0.twimg.com/responsive-web/web/ltr/icon-ios.a9cd885bccbcaf2f.png',
    description: 'Post your failures to Twitter!'
  },
  {
    title: 'email',
    icon: 'http://www.amalacademy.org/images/mail.png',
    description: 'Get an angry email!'
  }
];

class Punishments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      open: false,
      twitter: ''
    };

    this.handleTwitterSelect = this.handleTwitterSelect.bind(this);
  }

    handleTwitterSelect() {
      let token = window.localStorage.getItem('accessToken');
      let tokenObj = jwtDecode(token);
      const username = tokenObj.username;
      axios.get('/users/' + username)
      .then((response) => {
        if(response.data.twitter === null) {
          this.setState({open: true});
        } else {
          let goal = JSON.parse(window.localStorage.getItem('goalObj'));
          if (!goal) {
            goal = {};
          }
          goal.punishment = 'twitter';
          console.log('GOAL:', goal);
          window.localStorage.setItem('goalObj', JSON.stringify(goal));
          this.setState({redirect: true});
        }
      })
      .catch((err) => console.log(err));
    }

    handleTwitterChange(e) {
      console.log(this.state.twitter);
      this.setState({twitter: e.target.value});
    }

    handleTwitterSubmit() {
      if(this.state.twitter) {
        let token = window.localStorage.getItem('accessToken');
        let tokenObj = jwtDecode(token);
        const username = tokenObj.username;
        axios.post('/twitter/' + username, {twitter: this.state.twitter})
        .then((response) => {
          console.log(response.status);
          this.setState({redirect: true});
        })
        .catch((err) => console.log(err));
      }
    }

    handleClose() {
      this.setState({open: false});
    }

  render() {

    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onClick={this.handleTwitterSubmit.bind(this)}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose.bind(this)}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Input twitter handle"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <input type="text" onChange={this.handleTwitterChange.bind(this)} value={this.state.twitter} />
        </Dialog>

        {this.state.redirect === true ? <Redirect to="/review" /> : ''}
        <GridList 
          cellHeight={700}
          style={styles.gridList}
        >
          {punishments.map((pun) => (
            <GridTile key={pun.icon}>
              <Card style={cardStyles} onClick={() => {
                console.log('Window goalObj:', window.localStorage.getItem('goalObj'));
                let goal = JSON.parse(window.localStorage.getItem('goalObj'));
                if (!goal) {
                  goal = {};
                }
                goal.punishment = pun.title;
                console.log('GOAL:', goal);
                window.localStorage.setItem('goalObj', JSON.stringify(goal));

                if(pun.title === 'twitter') {
                  this.handleTwitterSelect();
                } else {
                  this.setState({redirect: true});
                }
              }}>
                <CardHeader
                  title={pun.title}
                />
                <CardMedia>
                  <img src={pun.icon} alt={pun.title}/>
                </CardMedia>
                <CardText>
                  {pun.description}
                </CardText>
              </Card>
            </GridTile>
          ))}
        </GridList>
      </div>
    );
  } 
} 

export default Punishments;