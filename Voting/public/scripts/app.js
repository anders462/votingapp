

(function(){

'use strict';

angular.module('votingApp', ['chart.js','ui.router','ngResource','ngAnimate'])
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
            // route for the settings page
            .state('app.settings', {
                url: 'settings',
                views: {
                    'content@': {
                        templateUrl : '/views/settings.html',
                        controller  : 'SettingsController',

                    }
                },
                data: {
                  authenticate: true
                }

            })
            .state('app.newpoll', {
                url: 'newpoll',
                views: {
                    'content@': {
                        templateUrl : '/views/newpoll.html',
                        controller  : 'NewPollController'
                        }
                    },
                data: {
                  authenticate: true
                }

            })
            .state('app.vote', {
                url: 'vote/:id',
                views: {
                    'content@': {
                        templateUrl : '/views/vote.html',
                        controller  : 'VoteController'
                        }
                    },
                data: {
                  authenticate: false
                }

            })
            .state('app.allpolls', {
                url: 'allpolls',
                views: {
                    'content@': {
                        templateUrl : '/views/allpolls.html',
                        controller  : 'AllPollsController',
                    }
                },
                data: {
                  authenticate: false
                }
            })
            .state('app.dashboard', {
                url: 'dashboard',
                views: {
                    'content@': {
                        templateUrl : '/views/dashboard.html',
                        controller  : 'DashBoardController',
                    }
                },
                data: {
                  authenticate: true
                }
            });


        $urlRouterProvider.otherwise('/')
    })

angular.module("votingApp")
  .run(function ($rootScope, $state, AuthService) {
    $rootScope.currentUser = localStorage.currentUser;
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

})();
