var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookie = require('cookie-parser');

var database = require('../database-mysql');
var db = require('../database-mysql/helpers/models.js');
//var requestHandler = require('./request-handler.js');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

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
  db.getGoalsForUser(req.body.username, (results) => {
    res.json(results);
  });
});


/******* Handle POST requests ********/
app.post('/login', function(req, res) {
  // Will cross reference login credentials
  // with db to confirm or deny login
  db.getAndVerifyUser(req.body, function(results) {
    if ( results === true ) {
      req.session.user = req.body.username;
      res.sendStatus(200);
    } else {
      res.sendStatus(403);
    }
  }); 
});

app.post('/signup', function(req, res) {
  console.log(req.body);
  db.insertUserIntoDB(req.body, function(results) {
    res.sendStatus(200);
  });
});

app.post('/goals', function(req, res) {
  // Will add goals to user in database
  db.insertGoalsIntoDB(req.body, (results) => {
    res.json({goalId: results.insertId});
  });
});

app.put('/goals', function(req, res) {
  if(req.body.action === 'increment') {
    db.incrementGoalCounter(req.body.goalId, (results) => {
      res.json(results);
    });
  } else if(req.body.action === 'delete') {
    console.log('Deleting goal with id:', req.body.goalId);
    db.deleteGoal(req.body.goalId, (results) => {
      res.json(results);
    });
  }
});

app.listen(process.env.PORT, function() {
  console.log('listening on port PORT!');
});

