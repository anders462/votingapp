'use strict';



angular.module('votingApp', ['ui.router','ngResource'])
.config(function($stateProvider, $urlRouterProvider) {


        $stateProvider

            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : '/views/header.html',
                    },
                    'content': {
                        templateUrl : '/views/home.html',
                        controller  : 'IndexController',

                    },
                    'footer': {
                        templateUrl : '/views/footer.html',
                    }
                },
                data: {
                  authenticate: false
                }

            })

            // route for the login page
            .state('app.login', {
                url:'login',
                views: {
                    'content@': {
                        templateUrl : '/views/login.html',
                        controller  : 'LoginController',

                    }
                },
                data: {
                  authenticate: false
                }

            })

            // route for the logout page
            .state('app.logout', {
                url:'logout',
                views: {
                    'content@': {
                        templateUrl : '/views/logout.html',
                        controller  : 'LogoutController',

                    }
                },
                data: {
                  authenticate: true
                }
            })

            // route for the register page
            .state('app.register', {
                url: 'register',
                views: {
                    'content@': {
                        templateUrl : '/views/register.html',
                        controller  : 'RegisterController',

                    }
                },
                data: {
                  authenticate: false
                }

            })
            .state('app.poll', {
                url: 'page1',
                views: {
                    'content@': {
                        templateUrl : '/views/poll.html',
                        controller  : 'PollController'
                        }
                    },
                data: {
                  authenticate: true
                }

            });



        $urlRouterProvider.otherwise('/login')
    })

angular.module("votingApp")
  .run(function ($rootScope, $state, AuthService) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      console.log("statechange");
       AuthService.isLoggedIn()
        // handle success
        .then(function (response) {
          console.log("auth state "+ response.auth);

        })
        .catch(function (response) {
        console.log("err: " + response.auth);
        if (toState.data.authenticate){
          // User isn’t authenticated
          $state.transitionTo("app.login");
          event.preventDefault();
        }
        });


    });
  });
