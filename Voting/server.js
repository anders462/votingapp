'use strict'
var express = require('express'),
    mongoose = require('mongoose'),
    dotenv = require('dotenv').config({silent: true}),
    passport = require('passport'),
    favicon = require('serve-favicon'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    LocalStrategy = require('passport-local').Strategy,
    morgan = require('morgan'),
    path = require('path'),
    routes = require(process.cwd() + '/routes/index.js');

    //create express app
    var app = express();
    app.use('client', express.static(__dirname + '/client'));
    app.use(favicon(__dirname + '/client/favicon.ico'));
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    // view engine setup
    app.set('views', path.join(__dirname, '/views'));
    app.set('view engine', 'jade');

    app.use(require('express-session')({
      secret: 'wake board',
      resave: false,
      saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    //app.use('/', routes);

    // passport config
    var Account = require(process.cwd() + '/models/account.js');
    passport.use(new LocalStrategy(Account.authenticate()));
    passport.serializeUser(Account.serializeUser());
    passport.deserializeUser(Account.deserializeUser());

    //set port to env.Port and 3000 as fallback
    app.set('port', (process.env.PORT || 3000));
    // connect with mongo db
    mongoose.connect("mongodb://localhost:27017/votingapp");
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Database failed to connect!'));
    db.once('open', function() {
      console.log('MongoDB successfully connected on port 27017.');
    });

    routes(app,passport,Account);

    app.listen(app.get('port'), function(){
      console.log("server is running on port " + app.get('port') + "...");
    });
