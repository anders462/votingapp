"use strict"
var Account = require(process.cwd() + '/models/account.js');


module.exports = function(app,passport) {

  app.route('/register')
  .post(function(req, res) {
    Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account) {
      if (err) {
        return res.status(500).json({err: err});
      }
      passport.authenticate('local')(req, res, function () {
        return res.status(200).json({status: 'Registration successful!'});
      });
    });
  });

  app.route('/login')
      .post(function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
        if (err) {
          return res.status(500).json({err: err});
        }
        if (!user) {
          return res.status(401).json({err: info});
        }
        req.logIn(user, function(err) {
          if (err) {
          return res.status(500).json({err: 'Could not log in user'});
          }
          res.status(200).json({status: 'Login successful!', info: user.username});
         });
       })(req, res, next);
     });

     app.route('/auth')
     .get(function(req, res) {
       if (req.user) {
         res.status(200).json({status: "logged in", auth: true});
      } else {
    // not logged in
        res.status(401).json({status: "not logged in", auth: false});
      }
     });

     app.route('/logout')
     .get(function(req, res) {
       req.logout();
       res.status(200).json({status: 'Bye!'});
     });


      //res.json("test");

  /*//main route to serve index.html
  app.route('/')
    .get(function(req,res){
      if (req.isAuthenticated()){}
        res.sendFile(process.cwd() + '/client/index.html');
        console.log(req.isAuthenticated());
      //res.json("test");

    });
/*
  app.route('/register')
      .get(function(req, res) {
        res.render('register', { });    })
      .post(function(req, res) {
        Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
            if (err) {
                return res.render('register', { account : account });
            }

            passport.authenticate('local')(req, res, function () {
                res.redirect('/');
            });
        });
    });

    app.route('/login')
      .get(function(req, res) {
        res.render('login', { user : req.user });
    })
    .post(passport.authenticate('local'), function(req, res) {
        res.redirect('/');
    });

    app.route('/logout')
      .get(function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.route('/ping')
      .get(function(req, res){
        res.status(200).send("pong!");
    });

*/
    //all other get request will result in 400 error
    app.use(function(req, res){
        res.sendStatus(404);
    });



}
