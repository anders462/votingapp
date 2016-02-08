

(function(){

'use strict';

angular.module('votingApp')
.constant("authUrl", "https://anders-voteup.herokuapp.com")
.factory('AuthService', ['$q', '$timeout', '$http','authUrl', function ($q, $timeout, $http,authUrl) {

  //https://anders-voteup.herokuapp.com/


  function isLoggedIn() {
    // create a new instance of deferred
    var deferred = $q.defer();

    // send a get request to the server
    $http.get(authUrl + '/auth')
      // handle success
      .success(function (data) {
        console.log("auth?: " + data.auth);
        deferred.resolve(data);
      })
      // handle error
      .error(function (data) {
        deferred.reject(data);
        console.log("auth?: " + data.auth);
      });

    // return promise object
    return deferred.promise;
  };


function login(username, password) {
  // create a new instance of deferred
  var deferred = $q.defer();

  // send a post request to the server
  $http.post(authUrl + '/login', {username: username, password: password})
    // handle success
    .success(function (data, status) {
      if(status === 200 && data.status){
        deferred.resolve(data);
      } else {

        deferred.reject(data);
      }
    })
    // handle error
    .error(function (data) {
      deferred.reject(data);
    });

  // return promise object
  return deferred.promise;

};

function logout() {

  // create a new instance of deferred
  var deferred = $q.defer();

  // send a get request to the server
  $http.get(authUrl + '/logout')
    // handle success
    .success(function (data) {
      deferred.resolve();
    })
    // handle error
    .error(function (data) {
      deferred.reject();
    });

  // return promise object
  return deferred.promise;

}

function register(username, password) {

  // create a new instance of deferred
  var deferred = $q.defer();

  // send a post request to the server
  $http.post(authUrl + '/register', {username: username, password: password})
    // handle success
    .success(function (data, status) {
      if(status === 200 && data.status){
        deferred.resolve();
      } else {
        deferred.reject();
      }
    })
    // handle error
    .error(function (data) {
      deferred.reject();
    });
  // return promise object
  return deferred.promise;

}

function updatePassword(oldPassword,newPassword){
  // create a new instance of deferred
  var deferred = $q.defer();

  // send a put/update request to the server
  $http.put(authUrl + '/update', {oldPassword: oldPassword, newPassword: newPassword})
    // handle success
    .success(function (data, status) {
      if(status === 200 && data.status){
        deferred.resolve();
      } else {
        deferred.reject();
      }
    })
    // handle error
    .error(function (data) {
      deferred.reject();
    });
  // return promise object
  return deferred.promise;


}

    // return available functions for use in controllers
    return ({
      isLoggedIn: isLoggedIn,  //true or false
      login: login,
      logout: logout,
      register: register,
      updatePassword:updatePassword
    });
}]);

})();
