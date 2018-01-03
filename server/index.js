var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mysql');
var requestHandler = require('./request-handler.js');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

