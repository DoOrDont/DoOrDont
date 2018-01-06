var express = require('express');
var passport = require('passport-twitter');
var Strategy = require('passport-twitter').Strategy;

var config = require('./config.js');

passport.use(new TwitterStrategy({
    consumerKey: config.TWITTER_CONSUMER_KEY,
    consumerSecret: config.TWITTER_CONSUMER_SECRET,
    // callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    // User.findOrCreate({ twitterId: profile.id }, function (err, user) {
      // return cb(err, user);
    // });
  }
));

// Will supply the user ID when serializing 
module.exports.serialize = passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// Will query the user record by ID from the database when deserializing
module.exports.deserialize = passport.deserializeUser(function(id, done) {
//  User.findById(id, function (err, user) {
//    done(err, user);
//  });
});

/************ ROUTING **************/
app.get('/auth/twitter',
  passport.authenticate('twitter'));

app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });