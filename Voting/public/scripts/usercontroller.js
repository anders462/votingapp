

(function(){
'use strict';

angular.module('votingApp')

        .controller('LoginController', LoginController);

          LoginController.$inject = ['$scope', '$window','$location', 'AuthService','$rootScope'];

          function LoginController($scope, $window, $location, AuthService,$rootScope) {


            $scope.login = function () {

                // initial values
                $scope.error = false;
                $scope.disabled = true;

                // call login from service
                AuthService.login($scope.loginForm.username, $scope.loginForm.password)
                  // handle success
                  .then(function (response) {
                    console.log(response.info);
                    $window.localStorage.currentUser = response.info;
                    $rootScope.currentUser = localStorage.currentUser;
                    $location.path('/');
                    $scope.disabled = false;
                    $scope.loginForm = {};
                    $location.path('/dashboard');
                  })
                  // handle error
                  .catch(function () {
                    $scope.error = true;
                    $scope.errorMessage = "Invalid username and/or password";
                    $scope.disabled = false;
                    $scope.loginForm = {};
              });
            };
        }

angular.module('votingApp')
        .controller('RegisterController', RegisterController);

          RegisterController.$inject =  ['$scope', '$location', 'AuthService'];

          function RegisterController($scope, $location, AuthService) {

            $scope.isLoggedIn = false;

            $scope.register = function () {

              // initial values
              $scope.error = false;
              $scope.disabled = true;
              console.log($scope.registerForm.username +" " + $scope.registerForm.password);
              // call register from service
              AuthService.register($scope.registerForm.username, $scope.registerForm.password)
                // handle success
                .then(function () {
                  $location.path('/login');
                  $scope.disabled = false;
                  $scope.registerForm = {};
                })
                // handle error
                .catch(function () {
                  $scope.error = true;
                  $scope.errorMessage = "Something went wrong!";
                  $scope.disabled = false;
                  $scope.registerForm = {};
                });

            };

        }

        angular.module('votingApp')
                .controller('SettingsController', SettingsController);

                  SettingsController.$inject =  ['$scope', '$location', 'AuthService'];

                  function SettingsController($scope, $location, AuthService) {


                    $scope.changePassword = function () {

                      // initial values
                      $scope.error = false;
                      $scope.disabled = true;

                      // call register from service
                      AuthService.updatePassword($scope.settingsForm.oldPassword, $scope.settingsForm.newPassword)
                        // handle success
                        .then(function () {
                          $location.path('/login');
                          $scope.disabled = false;
                          $scope.settingsForm = {};
                        })
                        // handle error
                        .catch(function () {
                          $scope.error = true;
                          $scope.errorMessage = "Something went wrong!";
                          $scope.disabled = false;
                          $scope.settingsForm = {};
                        });

                    };

                }


angular.module('votingApp')
        .controller('LogoutController', LogoutController);

         LogoutController.$inject = ['$scope', '$location', 'AuthService','$rootScope'];

          function LogoutController($scope, $location, AuthService, $rootScope) {

              $scope.logout = function () {


                // call logout from service
                AuthService.logout()
                  .then(function () {
                    localStorage.clear();
                    $rootScope.currentUser = "";
                    $location.path('/login');
                  });

              };

        };
})();
