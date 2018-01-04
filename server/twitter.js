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