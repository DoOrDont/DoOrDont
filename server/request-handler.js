var express = require('express');
var bodyParser = require('body-parser');
var database = require('../database-mysql/index.js');

var app = express();

/***** Handle GET requests ******/
app.get('/', function (req, res) {
  // Serves up index.html (currently login page)
  // Will refactor to redirect to user profile
  // once we handle cookies
  if (err) { return res.sendStatus(400); } 
  else { res.json(); }
});

app.get('/login', function(req, res) {
  // Renders login page
  if (err) { return res.sendStatus(400); } 
  else { res.json(); }
});

app.get('/goals', function(req, res) {
  // Will fetch goals for the specific user
  if (err) { return res.sendStatus(400); } 
  else { res.json(); }
});


/***** Handle POST requests ******/
app.post('/login', function(req, res) {
  // Will cross reference login credentials
  // with db to confirm or deny login
  if (err) { return res.sendStatus(400); } 
  else { res.json(); }
});

app.post('/signup', function(req, res) {
  // Will add user to db, making sure
  // they are not using a taken username
  if (err) { return res.sendStatus(400); } 
  else { res.json(); }
});

app.post('/goals', function(req, res) {
  // Will add goals to user in database
  if (err) { return res.sendStatus(400); } 
  else { res.json(); }
});

module.exports.requestHandler = requestHandler;
