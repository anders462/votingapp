// passport configurations for LocalStrategy
'use strict'
var Account = require(process.cwd() + '/models/account.js'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
  passport.serializeUser(Account.serializeUser());
  passport.deserializeUser(Account.deserializeUser());
  passport.use(new LocalStrategy(Account.authenticate()));
};
