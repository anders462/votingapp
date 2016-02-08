

(function(){

'use strict';

angular.module('votingApp')
.constant("baseUrl", "https://anders-voteup.herokuapp.com/api/poll")
.service('PollFactory', ['baseUrl', '$http', function(baseUrl, $http) {


this.addPoll = function(newPoll) {
  return $http.post(baseUrl, newPoll);
};

this.getPolls = function (id){
  return $http.get(baseUrl + '/' + id);
}

this.addCount = function (id,option) {
  console.log(option);
  return $http.put(baseUrl + '/' + id, option)
}

this.addPollOption = function (id,option) {
  console.log(option);
  return $http.put(baseUrl + '/add/' + id, option)
}


this.getUserPolls = function (all){
  return $http.get(baseUrl);
}

this.getAllUsersPolls = function (){
  return $http.get(baseUrl+"/all");
}

this.deletePoll = function (id){
  return $http.delete(baseUrl + '/' + id);
}

}]);

})();
