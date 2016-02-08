

(function(){

'use strict';

  angular.module('votingApp')

      .controller('IndexController', IndexController);


      IndexController.$inject = ['$scope', '$window', '$location', 'PollFactory'];

        function IndexController($scope, $window, $location, PollFactory) {
          $scope.data =[];
          $scope.labels = [];
          $scope.vote = {};
          $scope.featured = 2;


          $scope.updateChart = function(){
          $scope.data = [];
          $scope.labels =[];
          $scope.vote.options.forEach(function(option){
             $scope.data.push(option.count);
              $scope.labels.push(option.optionName);
              console.log(option.optionName + ": " + option.count);
          });
          };

          $scope.getPoll = PollFactory.getPolls(parseInt($scope.featured,10))
                .then(
                          function(response){
                              $scope.vote = response.data[0];
                              $scope.updateChart();
                              console.log("getpoll");
                              console.log($scope.vote);
                          },
                          function(response) {
                              $scope.vote.pollname ="This poll doesn't exist or has been deleted";
                              $scope.message = "Error: "+response.status + " " + response.statusText;
                          }
          );

        };
})();
