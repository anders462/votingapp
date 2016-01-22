


angular.module('votingApp')

        .controller('IndexController', ['$scope', function($scope) {



        }])

        .controller('Page1Controller', ['$scope', '$location', 'AuthService',function ($scope, $location, AuthService) {

            

        }])


        .controller('LoginController',['$scope', '$window','$location', 'AuthService',function ($scope, $window, $location, AuthService) {


            $scope.login = function () {

                // initial values
                $scope.error = false;
                $scope.disabled = true;

                // call login from service
                AuthService.login($scope.loginForm.username, $scope.loginForm.password)
                  // handle success
                  .then(function (response) {
                    console.log(response);
                    $window.localStorage.currentUser = JSON.stringify(response.info);
                    $location.path('/');
                    $scope.disabled = false;
                    $scope.loginForm = {};
                  })
                  // handle error
                  .catch(function () {
                    $scope.error = true;
                    $scope.errorMessage = "Invalid username and/or password";
                    $scope.disabled = false;
                    $scope.loginForm = {};
              });
            };
        }])


        .controller('RegisterController', ['$scope', '$location', 'AuthService',
          function ($scope, $location, AuthService) {



            $scope.register = function () {

              // initial values
              $scope.error = false;
              $scope.disabled = true;

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

        }])

        .controller('LogoutController', ['$scope', '$location', 'AuthService',
          function ($scope, $location, AuthService) {


              $scope.logout = function () {


                // call logout from service
                AuthService.logout()
                  .then(function () {
                    $location.path('/login');
                  });

              };

        }]);
