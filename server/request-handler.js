var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var session = require('express-session');
var cookie = require('cookie-parser');

var database = require('../database-mysql/index.js');

/***** Handles user credentials ******/
var restrict = (req, res, next) => {
  // if user is logged in, serve index
  // else, error message
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
};

/******* Handle GET requests ********/
app.get('/', function (req, res) {
  // Serves up index.html user profile
  // once we handle cookies
  res.json();
});

app.get('/login', function(req, res) {
  // Renders login page
  res.json();
});

app.get('/goals', function(req, res) {
  // Will fetch goals for the specific user
 res.json();
});


/******* Handle POST requests ********/
app.post('/login', function(req, res) {
  // Will cross reference login credentials
  // with db to confirm or deny login
  database.getAndVerifyUser(userObj, function(results) {
    if ( results === true ) {
      req.session.user = req.body.username;
      res.sendStatus(200);
    } else {
      res.sendStatus(403);
    }
  }); 
});

app.post('/signup', function(req, res) {
  database.insertUserIntoDB(userObj, function(results) {
    res.sendStatus(200);
  });
});

app.post('/goals', function(req, res) {
  // Will add goals to user in database
  res.json();
});

