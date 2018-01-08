import $ from 'jquery';

const axios = require('axios');

const submitCreds = (credObj, url) => {
    console.log('about to send post');
    // let ajaxObj = {
    //   type: 'POST',
    //   url: url, 
    //   data: JSON.stringify(credObj),
    //   contentType: "application/json; charset=utf-8",
    //   dataType: "json",
    //   success: (data) => {
    //     console.log('data', data);        
    //     // this.setState({
    //     //   cookie: data
    //     // });
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   }
    // };
    // $.ajax(ajaxObj);  

    axios.post(url, credObj)
      .then(function (response) {
          if(response.status === 200){
            console.log(response);
            
          }
        })
      .catch(function (error) {
        console.log(error);
      });

  };

  module.exports.submitCreds = submitCreds;