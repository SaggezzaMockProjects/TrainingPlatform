'use strict';
/**
 * @name login.js
 * @description Validates the login credentials through Firebase API.
 */

 function CheckPasswords(user) {
   if(user.password !== user.repeatPassword) {
     return false;
   }
   return true;
 }

 function ForgotPasswordCtrl(auth,$location,$scope,ngDialog) {
   $scope.forgotPassword = function(user) {
     //Send reset password email through firebase/AngularFire API
     auth.$resetPassword({
       email: user.email
     }).then(function() {
       $scope.message = "Successfully sent password reset email";
       ngDialog.closeAll();
     }).catch((function(err) {
       switch(err.code) {
         case "INVALID_USER":
           $scope.message = "This email is not associated with any user.";
           break;
         default:
           $scope.message = "Error resetting password. Please try again.";
           break;
       }
     }).bind(this));
   };
 }

 function RegisterCtrl(auth,$location,$scope,ngDialog) {
   $scope.register = function(user) {
     if(!user) {
       return false;
     }
     //Return if passwords don't match
     if(CheckPasswords(users)) {
       $scope.message = "Passwords do not match.";
       return false;
     }
     //Firebase API to create user
     auth.$createUser({
       email    : user.email,
       password : user.password
     }).then(function() {
       //Close Dialog and Return to Login page
       $location.path('/login');
       $scope.message = "Successfully Registered.";
       ngDialog.closeAll();
     }).catch((function(err) {
       //Error codes through Firebase/AngularFire
       switch (err.code) {
        case "EMAIL_TAKEN":
          $scope.message = "Email is already taken.";
          break;
        case "INVALID_EMAIL":
          $scope.message = "Invalid Email.";
          break;
        default:
          $scope.message = "Error creating user.";
          break;
      }
     }).bind(this));
   };
 }

 function UpdatePasswordCtrl(auth,$location, ngDialog, $scope) {
   this.updatePassword = function(user) {
     if(!user) {
       return false;
     }
     //Return if passwords don't match
     if(CheckPasswords(users)) {
       $scope.message = "Passwords do not match.";
       return false;
     }

     //Change Password using AngularFire API and Firebase
     auth.changePassword({
       email       : loginData.password.email,
       oldPassword : user.oldPassword,
       newPassword : user.newPassword
     }).then(function() {
       $location.path('/dashboard');
     }).catch((function(err) {
       $scope.message = err.code;
     }).bind(this));
   }
 }

 function LoginCtrl(auth, $location, ngDialog, $scope) {
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
     }, function(error, authData) {
       if(error) {
         $scope.message = "Login Failed"
       } else if(authData.password.isTemporaryPassword) {
         ngDialog.open({
           templateUrl: '/views/updatePassword.html',
           controller: UpdatePasswordCtrl,
           locals: {
             loginData: authData
           }
         });
       }
     }, {
       remember: "sessionOnly"
     }).then(function() {
       $location.path('/dashboard');
     }).catch((function(err) {
       $scope.message = "Incorrect Email/Password Combination";
     }).bind(this));
   };

   //Open dialog for the forgot password link
   this.forgotPassword = function() {
     ngDialog.open({
       templateUrl: '/views/forgot.html',
       controller: ForgotPasswordCtrl
     });
   };

   //Dialog for registering users
   this.registerUser = function() {
     ngDialog.open({
       template: '/views/register.html',
       controller: RegisterCtrl
     });
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
