'use strict';

/**
 * @name trainingPlatformApp.controller:ForgotPasswordCtrl
 * @description Sends a forgot password email to the entered email
 ***********IMPORTANT!!!!!! THIS CLASS IS NOT FINISHED.. *************
 */

/**
* @name ForgotPasswordCtrl
* @description Resets the password in the Firebase DB. Needs to be updated
* with error messages in HTML/JS file.
*/
 function ForgotPasswordCtrl(auth) {
   this.forgotpassword = function(user) {
     //Firebase and AngularFire API
     auth.resetPassword({
       email: user.email
     }, function(error) {
       if(error) {
         switch(error.code) {
           case "INVALID_USER":
             this.message = "This email does not exist";
             break;
           default:
             this.message = "Error resetting password. Please try again.";
         }
       } else {
         this.message = "Password reset email sent successfully";
       }
     });
   };
 }

/**
* @name module
* @description Connects the forgotpassword view and controller together
*/
 angular.module('trainingPlatformApp')
   .component('forgotpassword', {
     templateUrl: '/views/forgotpassword.html',
     controller: ForgotPasswordCtrl
   });
