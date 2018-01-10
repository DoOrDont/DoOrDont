import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText, GridList, GridTile} from 'material-ui';
import {Redirect} from 'react-router-dom';

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
      redirect: false
    };
  }

  render() {
    return (
      <div>
        {this.state.redirect === true ? <Redirect to="/review" /> : ''}
        <GridList 
          cellHeight={700}
          style={styles.gridList}
        >
          {punishments.map((pun) => (
            <GridTile key={pun.icon}>
              <Card style={cardStyles} onClick={() => {
                let goal = JSON.parse(window.sessionStorage.getItem('goalObj'));
                if (!goal) {
                  goal = {};
                }
                goal.punishment = pun.title;
                console.log('GOAL:', goal);
                window.sessionStorage.setItem('goalObj', JSON.stringify(goal));
                this.setState({redirect: true});
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