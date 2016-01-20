/*var basicAuth = require('basic-auth'),
    User = require(process.cwd() + '/server_app/models/users.js');

/**
 * Simple basic auth middleware for use with Express 4.x.
 *
 * @example
 * app.use('/api-requiring-auth', utils.basicAuth('username', 'password'));
 *
 * @param   {string}   username Expected username
 * @param   {string}   password Expected password
 * @returns {function} Express 4 middleware requiring the given credentials
 */
/*
exports.basicAuth = function(username, password) {
  return function(req, res, next) {
    var user = basicAuth(req);
    if (!user || !user.pass){
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.send(401);
    } else
    var newUser = new User({username: user.name, password: user.pass});
      newUser.save(function(err,newUser){
        if(err){
          throw(err);
        }
      });

    //console.log(user);

  var newUser = new User({username: user.name, password: user.pass});
    newUser.save(function(err,newUser){
      if(err){
        throw(err);
      }
    });
  var search =  new User({username: user.name});
    search.find(function(err,search){
      if (err){
        throw(err);
      }
      console.log(search);
    });

     else {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.send(401);
    }
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
    
    next();
  };
};
*/
