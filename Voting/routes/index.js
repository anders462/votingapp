"use strict"
var Account = require(process.cwd() + '/models/account.js');


module.exports = function(app,passport) {

// **** USER handling ****
//register user
  app.route('/register')
  .post(function(req, res) {
    console.log(req.body.username);
    console.log(req.body.password);
    Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account) {
      if (err) {
        return res.status(500).json({err: err});
      }
      passport.authenticate('local')(req, res, function () {
        return res.status(200).json({status: 'Registration successful!'});
      });
    });
  });

  //update password
    app.route('/update')
    .put(function(req, res) {
      if (req.user){
        Account.findOne({username:req.user.username,password: req.body.oldPassword}, function(err,doc){

        if (err) {
          throw(err);
        }
        if (doc){
        res.status(200).json(doc);
      } else {
        res.status(400).json("password is not matching");
      }
    /*  passport.setPassword({password: req.body.newPassword }, function(err, account) {
        if (err) {
          return res.status(500).json({err: err});
        }
        passport.authenticate('local')(req, res, function () {
          return res.status(200).json({status: 'Update successful!'});
        });
      }); */
      });
      } else {
         res.status(401).json("not authenticated")
      }

    });

//login user
  app.route('/login')
      .post(function(req, res, next) {
        console.log("login" + req.body.username);
        console.log("login" + req.body.password);
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
          console.log("success");
         });
       })(req, res, next);
     });


     //logout user
     app.route('/logout')
     .get(function(req, res) {
       req.logout();
       res.status(200).json({status: 'Bye!'});
     });

     // check if user is authenticated
     app.route('/auth')
     .get(function(req, res) {
       console.log("auth: " + req.user);
       if (req.user) {
         res.status(200).json({status: "logged in", auth: true});
      } else {
     // not authorized
        res.status(401).json({status: "not logged in", auth: false});
      }
     });


    //all other get request will result in 400 error
    app.use(function(req, res){
        res.status(400).json({success: false: "No such route"});
    });



}
