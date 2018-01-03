var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mysql');
var requestHandler = require('./request-handler.js');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

