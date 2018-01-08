import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText, GridList, GridTile} from 'material-ui';

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
  maxWidth: '200px',
  transitionDuration: '0.3s',
  height: '45vw'
};

const punishments = [
  {
    title: 'Twitter',
    icon: 'https://abs-0.twimg.com/responsive-web/web/ltr/icon-ios.a9cd885bccbcaf2f.png',
    description: 'Post your failures to Twitter!'
  }
];

const Punishments = (props) => (
  <div>
    <GridList 
      cellHeight={700}
      style={styles.gridList}
    >
      {punishments.map((pun) => (
        <GridTile key={pun.icon}>
          <Card style={cardStyles}>
            <CardHeader
              title={pun.title}
            />
            <CardMedia>
              <img src={pun.icon} alt="twitter icon"/>
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

export default Punishments;