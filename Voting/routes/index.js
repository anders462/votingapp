"use strict"

module.exports = function(app,passport,Account) {

  //main route to serve index.html
    app.route('/')
    .get(function(req,res){
        //res.sendFile(process.cwd() + '/client/index.html');
      res.render('index', { user : req.user });

    });

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


    //all other get request will result in 400 error
    app.use(function(req, res){
        res.sendStatus(404);
    });



}
