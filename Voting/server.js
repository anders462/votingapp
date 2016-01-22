'use strict'
var express = require('express'),
    mongoose = require('mongoose'),
    dotenv = require('dotenv').config({silent: true}),
    passport = require('passport'),
    favicon = require('serve-favicon'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    path = require('path'),
    routes = require(process.cwd() + '/routes/index.js'),
    passportSetUp = require('./config/passport.js');

    //create express app
    var app = express();
    passportSetUp(passport);
    //set public and bower directory paths relative to server root
    app.use('/public/bower_components',  express.static(process.cwd() + '/public/bower_components'));
    //app.use('/public',  express.static(process.cwd() + '/public'));
    app.use(express.static('public'));
    app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use(require('express-session')({
      secret: 'wake board',
      resave: false,
      saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    //app.use('/', routes);

    //set port to env.Port and 3000 as fallback
    app.set('port', (process.env.PORT || 3000));
    // connect with mongo db
    mongoose.connect("mongodb://localhost:27017/votingapp");
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Database failed to connect!'));
    db.once('open', function() {
      console.log('MongoDB successfully connected on port 27017.');
    });

    routes(app,passport);

    app.listen(app.get('port'), function(){
      console.log("server is running on port " + app.get('port') + "...");
    });
