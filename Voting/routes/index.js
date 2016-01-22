"use strict"
var Account = require(process.cwd() + '/models/account.js');


module.exports = function(app,passport) {


//register user
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

//login user
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

     // check if user is authenticated
     app.route('/auth')
     .get(function(req, res) {
       if (req.user) {
         res.status(200).json({status: "logged in", auth: true});
      } else {
    // not logged in
        res.status(401).json({status: "not logged in", auth: false});
      }
     });

     //logout user
     app.route('/logout')
     .get(function(req, res) {
       req.logout();
       res.status(200).json({status: 'Bye!'});
     });


    //all other get request will result in 400 error
    app.use(function(req, res){
        res.sendStatus(404);
    });



}
