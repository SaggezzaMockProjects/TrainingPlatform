'use strict';

/**
 * @name registerUser
 * @description Creates a new user using their email and password through
 * the Firebase API.
 ***** KINDA DONE... JUST NEED TO CONNECT DB TO SHOW SPECIFIC TRAININGS ETC..
 */

 function registerUser(auth,$location) {
   this.register = function(user) {
     if(user === null) {
       return;
     }
     //Firebase API
     auth.$createUser({
       email    : user.email,
       password : user.password
     }, function(error) {
       if(error) {
         this.errorMessage = "Error Creating User. Please try again.";
       }
     }).then(function() {
       $location.path('/login');
     }).catch((function(err) {
       this.errorMessage = err.code;
     }).bind(this));
   };
 }

 angular.module('trainingPlatformApp')
   .component('register', {
     templateUrl: '/views/register.html',
     controller: registerUser
   });
