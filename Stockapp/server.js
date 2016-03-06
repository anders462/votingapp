'use strict'
var express = require('express'), // express lightweight node framework
    mongoose = require('mongoose'), // mongoose abstraction of mongodb
    morgan = require('morgan'), // morgan as logger
    bodyParser = require('body-parser'), // enabling parsing of body params
    dotenv = require('dotenv').config({silent: true}), // make .env available to process.env
    cors = require('cors'), // Cors configuration
    favicon = require('serve-favicon'),
    config = require('./config'),
    api = require('./routes/api'); // get api routes module

    var app = express(); // create express app instance
    var http = require('http').Server(app);
    var io = require('socket.io')(http);
    app.use(cors());  //add CORS to all routes
    app.set('port', (process.env.PORT || 8000));   // set port for server

     //-----------------------------------
     // -- connect to mongo database -----
     //-----------------------------------
    mongoose.connect(config.database); //change when running local db
  //  mongoose.connect(process.env.MONGOLAB_URI);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Database failed to connect!'));
    db.once('open', function() {
      console.log('MongoDB successfully connected on port 27017.');
    });

    //add middleware parser for urlencoded body data POST and URL JSon params
    app.use(bodyParser.urlencoded({extended:false})); //extended = false option => use querystring library
    app.use(bodyParser.json());
    //add middleware for static route
    app.use(express.static('public')); //mount stattic route public
    app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(morgan('dev')); //add morgan middleware logger

    //api(app, io); // call api routes module with app and io instance

    io.on('connection', function(socket){
      console.log('a user connected');
      socket.on('disconnect', function(){
        console.log('user disconnected');
      });
      socket.on('chat message', function(msg){
        console.log('message: ' + msg);
      });
      socket.on('chat message', function(msg){
        io.emit('chat message', msg);
      });
    });



    // Start the server
    var server = app.listen(app.get('port'), function(){
      console.log("server is running on port " + app.get('port') + "...");
    });

    module.exports = server;
