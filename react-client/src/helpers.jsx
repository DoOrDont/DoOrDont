import $ from 'jquery';

const axios = require('axios');

const submitCreds = (credObj, url) => { 
    axios.post(url, credObj)
      .then(function (response) {
          if(response.status === 200){
            console.log(response);
            window.localStorage.accessToken = response.data.token;
          }
        })
      .catch(function (error) {
        console.log(error);
      });

  };

  module.exports.submitCreds = submitCreds;