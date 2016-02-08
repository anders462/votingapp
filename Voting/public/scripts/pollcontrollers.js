

(function(){

'use strict';

angular.module('votingApp')

  .controller('NewPollController', NewPollController);

    NewPollController.$inject = ['$scope', '$stateParams', "$window", '$location', 'PollFactory'];

    function NewPollController($scope, $stateParams, $window, $location, PollFactory) {

     var defaultPoll = {pollname: "", options: [{no: 1, optionName:"", count: 0},{no:2, optionName:"", count: 0}]};
     $scope.poll = defaultPoll;
     $scope.pollCreated = {};
     $scope.vote = {};




      $scope.newPoll = function(){
        $scope.showUrl = false;
        console.log($scope.poll);

        PollFactory.addPoll($scope.poll)
            .then(
              // if success
              function(response){
                console.log(response.data);
                $scope.pollCreated = response.data;
                console.log($scope.pollCreated.pollname);
                $scope.showUrl= true;


                //$location.path('/mypoll');
            },
            //if error
            function(response){
              console.log(response.status + " " + response.statusText);
              $scope.message = "Error: your poll was not added!";
        });


     };

     $scope.newOption = function(){
       if ($scope.poll.options.length < 10){
         var newId = $scope.poll.options.length  + 1;
         $scope.poll.options.push({no: newId, optionName:"",count: 0});

       }
     };

     $scope.deleteOption = function(){
        if ($scope.poll.options.length > 2){
          $scope.poll.options.pop();
        }
     };


    }

angular.module('votingApp')
    .controller('VoteController', VoteController);


    VoteController.$inject = ['$scope', '$stateParams', "$window", '$location', 'PollFactory','$rootScope','AuthService'];


    function VoteController($scope, $stateParams, $window, $location, PollFactory, $rootScope,AuthService) {

      //default value for chart arrays and chart type
      $scope.data =[];
      $scope.labels = [];
      $scope.type = 'Pie';
      //show add option button when authenticated
      $scope.isAuth = AuthService.isLoggedIn();
      $scope.newOptionForm = {};
      $scope.pollOption ={}
      $scope.isAuth =false;
      $scope.voted = false;

      function checkLoggedIn() {
        AuthService.isLoggedIn()
       // handle success
       .then(function (response) {
         console.log("isAuth: "+ response.auth);
         $scope.isAuth = response.auth;
       })
       .catch(function (response) {
           console.log("isAuth: " + response.auth);
           $scope.isAuth = response.auth;
       });
     };

     checkLoggedIn()

       console.log("Check " + $scope.isAuth);

       //Enable toggling between charts
       $scope.toggle = function () {
         $scope.type = $scope.type === 'Pie' ?
           'Doughnut' : 'Pie';
       };

      $scope.newOption = function(){
         if ($scope.vote.options.length < 10){
           var newId = $scope.vote.options.length  + 1;
          $scope.pollOption = ({no: newId, optionName: $scope.newOptionForm.optionName,count: 0});
          $scope.addOption();


         }
       };

      $scope.updateChart = function(){
      $scope.data = [];
      $scope.labels =[];
      $scope.vote.options.forEach(function(option){
         $scope.data.push(option.count);
          $scope.labels.push(option.optionName);
      });
      };

    $scope.getPoll = PollFactory.getPolls(parseInt($stateParams.id,10))
          .then(
                    function(response){
                        $scope.vote = response.data[0];
                        $scope.updateChart();
                        console.log("getpoll");
                    },
                    function(response) {
                        $scope.vote.pollname ="This poll doesn't exist or has been deleted";
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    }
    );

    $scope.optionNumber = 1;

    $scope.votePoll = function(){
      console.log($scope.optionNumber);
      PollFactory.addCount(parseInt($stateParams.id,10),{"option": $scope.optionNumber})
         .then(
                function(response){
                  console.log("vote");
                  console.log(response.data);
                  $scope.vote = response.data;
                  $scope.updateChart();
                  $scope.voted = true;
                },
                function(response){
                  console.log("Error: "+response.status + " " + response.statusText);
                }
         );
      };

      $scope.addOption = function(){
        console.log($scope.pollOption);
        PollFactory.addPollOption(parseInt($stateParams.id,10),{"option": $scope.pollOption})
           .then(
                  function(response){
                    console.log("vote");
                    console.log(response.data);
                    $scope.vote = response.data;
                    //$scope.updateChart();
                  },
                  function(response){
                    console.log("Error: "+response.status + " " + response.statusText);
                  }
           );
        };


};

angular.module('votingApp')

  .controller('DashBoardController', DashBoardController);

    DashBoardController.$inject = ['$scope', '$stateParams', "$window", '$location', 'PollFactory'];

    function DashBoardController($scope, $stateParams, $window, $location, PollFactory) {

      $scope.mypolls ={};
      $scope.max = 25;
      $scope.noPolls = false;
      console.log("any polls"+$scope.myPolls);


      $scope.getMyPolls = function() {

        PollFactory.getUserPolls()
            .then(
              // if success
              function(response){
                console.log(response.data);
                $scope.mypolls = response.data;
                $scope.noPolls = $scope.mypolls.length === 0 ? true: false;
            },
            //if error
            function(response){
              console.log(response.status + " " + response.statusText);
              $scope.message = "No polls could be retrieved!";
        });
      };

      $scope.getMyPolls();

  $scope.deletePoll = function(id){
       console.log("delete "+ id);
       PollFactory.deletePoll(parseInt(id,10))
          .then(
                 function(response){
                   console.log(response.data);
                   $scope.getMyPolls();
                 },
                 function(response){
                   console.log("Error: "+response.status + " " + response.statusText);
                 }
          );
       };

 };

 angular.module('votingApp')

   .controller('AllPollsController', AllPollsController);

     AllPollsController.$inject = ['$scope', '$stateParams', "$window", '$location', 'PollFactory'];

     function AllPollsController($scope, $stateParams, $window, $location, PollFactory) {

       $scope.mypolls ={};

       $scope.max = 25;



       $scope.getAllPolls = function() {

         PollFactory.getAllUsersPolls()
             .then(
               // if success
               function(response){
                 console.log(response.data);
                 $scope.mypolls = response.data;
             },
             //if error
             function(response){
               console.log(response.status + " " + response.statusText);
               $scope.message = "Error: No polls could be retrieved!";
         });
       };

       $scope.getAllPolls();


  };

//Custom filter to trunc sentence length and add '...'
 angular.module('votingApp')
  .filter('maxLength', function(){
    return function(pollname,max){
      if (pollname.length > max){
        pollname = pollname.slice(0,max) + '...';
      }
      return pollname;
    }

  });


})();
