var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var session = require('express-session');
var cookie = require('cookie-parser');

var database = require('../database-mysql/index.js');

/***** Handles authorization ******/
var restrict = (req, res, next) => {
  // if user is logged in, serve index
  // if user is not logged in, serve login
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
  }
};

/******* Handle GET requests ********/
app.get('/', restrict, function (req, res) {
  // Serves up index.html user profile once we handle cookies
  if (err) { return res.sendStatus(400); } 
  else { res.sendFile(path.join(__dirname + './react-client/dist/index.html')); }
});

app.get('/login', function(req, res) {
  // Renders login page
  if (err) { return res.sendStatus(400); } 
  else { req.session.user = ''; }
});

// app.get('/goals', function(req, res) {
//   // Will fetch goals for the specific user
//   if (err) { return res.sendStatus(400); } 
//   else { res.json(); }
// });


/******* Handle POST requests ********/
app.post('/login', function(req, res) {
  // Will cross reference login credentials
  // with db to confirm or deny login
  if (err) { return res.sendStatus(400); } 
  else { 
    database.getAndVerifyUser(userObj, function(results) {
      if ( results === true ) {
        req.session.user = req.body.username;
      } else {
        res.sendStatus(403);
      }
    }); 
  }
});

app.post('/signup', function(req, res) {
  // Will add user to db, making sure they are not using a taken username
  if (err) { return res.sendStatus(400); } 
  else { 
    database.insertUserIntoDB(userObj, function(results) {
      res.sendStatus(200);
    });
  }
});

app.post('/goals', restrict, function(req, res) {
  // Will add goals to user in database
  if (err) { return res.sendStatus(400); } 
  else { 
    database.insertGoalsIntoDB(goalsObj, function(results) {
      res.json({goalId: results.insertId});
    });
  }
});

