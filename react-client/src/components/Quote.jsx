import React from 'react';
const axios = require('axios');

class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: 'do or do not',
      author: 'unknown'
    };
    this.updateQuote = this.updateQuote.bind(this);
  }

  updateQuote(obj){
    if(obj.data.contents.quotes[0].quote){
      this.setState({
        quote: obj.data.contents.quotes[0].quote,
        author: obj.data.contents.quotes[0].author
      });
    }
  }

  componentDidMount() {
    axios.get('http://quotes.rest/qod.json?category=inspire')
    .then((response) => {
      console.log(response.data.contents.quotes[0].author);
      this.updateQuote(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        {this.state.quote}
        <br/>
        -{this.state.author}
      </div>
    )
  }
}


export default Quote;