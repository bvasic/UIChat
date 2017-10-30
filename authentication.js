var express = require('express');
var app = express();
var passport = require('passport'),
    GoogleStrategy = require('passport-google-auth').Strategy;
passport.use(new GoogleStrategy({
    clientId: '1078194343536-qi1h7u749vjja21bp6udh03ibnv5t69e.apps.googleusercontent.com',
    clientSecret: 'S6BwhPXqPtc6tXv4lZ9GQQp0',
    callbackURL: 'http://localhost:5555/oauth2callback'
  },
  function(accessToken, refreshToken, profile, done) {
    app.get('/');
  }
));