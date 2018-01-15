import React from 'react';
const axios = require('axios');

const quotes = [
  { text: 'The least movement is of importance to all nature. The entire ocean is affected by a pebble.', 
    author: 'Blaise Pascal'
  },
  { text: 'The key to growth is the introduction of higher dimensions of consciousness into our awareness.', 
    author: 'Lao Tzu'
  },
  { text: 'It does not matter how slowly you go as long as you do not stop.', 
    author: 'Confucius'
  },
  { text: 'The first step to getting the things you want out of life is this: decide what you want.', 
    author: 'Ben Stein'
  },
  { text: 'A good plan today is better than a perfect plan tomorrow.', 
    author: 'unknown'
  },
  { text: 'Well done is better than well said.', 
    author: 'Benjamin Franklin'
  },
  { text: 'Obstacles are those things you see when you take your eyes off the goal.', 
    author: 'Hannah More'
  },
  { text: 'There are no failures - just experiences and your reactions to them.', 
    author: 'Tom Krause'
  },
  { text: 'The person who makes a success of living is the one who sees his goal steadily and aims for it unswervingly. That is dedication.', 
    author: 'Cecil B. DeMille'
  },
  { text: 'If you find yourself in a hole, the first thing to do is stop digging.', 
    author: 'Will Rogers'
  },
]

class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: 'do or do not',
      author: 'unknown'
    };
  }

  componentDidMount() {
    let randomNum = Math.floor(Math.random() * 10);
    let quote = quotes[randomNum]['text'];
    let author= quotes[randomNum]['author'];
    this.setState({quote: quote, author: author});
  }

  render() {
    return (
      <div>
        {this.state.quote}  -{this.state.author}
      </div>
    )
  }
}


export default Quote;