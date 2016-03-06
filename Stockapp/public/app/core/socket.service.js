(function(){
"use strict"

//Factory for all /api/bars api calls part of sub module "core"
angular
   .module('stockApp.core')
   .factory('socketFactory', socketFactory);

   socketFactory.$inject = ['BASE_URL'];

   function socketFactory(BASE_URL){

    var socket = io();

     function sendData(stock){
      //socket.emit('stock', stock);
     }



     // return available functions for use in controllers
     return {
       sendData: sendData
     };


   }

})();
