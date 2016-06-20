'use strict';
/**
 * @name login.js
 * @description Validates the login credentials through Firebase API.
 *********NEEDS ERROR MESSAGES IN HTML/JS files*************
 */

 function LoginCtrl(auth, $location) {
   this.loggedIn = !!this.currentAuth;

   this.login = function(user) {
     //Return if user credentials are empty
     if(!user) {
       return false;
     }
     //Authorize user with email and password through Firebase API
     auth.$authWithPassword({
       email    : user.email,
       password : user.password
     }, function(error) {
       if(error) {
         this.errorMessage = "Login Failed";
       }
     }, {
       remember: "sessionOnly"
     }).then(function() {
       $location.path('/dashboard');
     }).catch((function(err) {
       this.errorMessage = err.code;
     }).bind(this));
   };
 }

 /**
  * @name login module
  * @description Connects the view and the controller for the login
  */
 angular.module('trainingPlatformApp')
   .component('login', {
     templateUrl: '/views/login.html',
     bindings: {
       currentAuth: '='
     },
     controller: LoginCtrl
   });
