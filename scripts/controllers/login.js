/**
 * @name login.js
 * @description Validates the login credentials through Firebase API.
 */

'use strict';

 /**
  * @name SetAdminAccess
  * @description Reads the DB to check if the logged in user is an Admin
  */
 function SetAdminAccess(authData,fbRef,userService) {
   fbRef.getAdminRef().child(authData.uid).once("value", function(snapshot) {
     if(snapshot.val()) {
       userService.setIsAdmin(true);
     } else {
       userService.setIsAdmin(undefined);
     }
  });
 }

 /**
  * @name ForgotPasswordCtrl
  * @description Resets the user's password and sends a forgot password email 
  */
 function ForgotPasswordCtrl(auth,$location,$scope,ngDialog) {
   
   $scope.forgotPassword = function(user) {
     //Send reset password email through firebase/AngularFire API
     auth.$resetPassword({
       email: user.email
     }).then(function() {
       $scope.successMessage = "Successfully sent password reset email";
       ngDialog.closeAll();
     }).catch((function(err) {
       //AngularFire error codes
       switch(err.code) {
         case "INVALID_USER":
           $scope.failedMessage = "This email is not associated with any user.";
           break;
         default:
           $scope.failedMessage = "Error resetting password. Please try again.";
           break;
       }
     }).bind(this));
   };
 }
 
 /**
  * @name RegisterCtrl
  * @description Creates email/password user in the Firebase DB
  */
 function RegisterCtrl(auth,$location,$scope,ngDialog, fbRef, userService) {
   //Triggers when user presses sign up button
   $scope.register = function(user) {
     if(!user) {
       return false;
     }

     //Return if passwords don't match
     if(user.password !== user.repeatPassword) {
       $scope.failedMessage = "Passwords do not match.";
       return false;
     }
     //Firebase/AngularFire API to create user
     auth.$createUser({
       email    : user.email,
       password : user.password
     } , function(error) {
       if(error) {
         return false;
       }
     }).then(function() {
       //Close Dialog and return to Login page
       $location.path('/login');
       ngDialog.closeAll();
       $scope.$successMessage = "Successfully Registered.";

       //See if user exists on login
       fbRef.getUsersRef().onAuth(function(authData) {
        if(authData === null){
          return false;
        }
        //Read DB to see if user exists
        var name = user.firstName + " " + user.lastName;
        userService.setUserName(name);
        fbRef.getUsersRef().child(authData.uid).once("value", function(snapshot) {
          if(!snapshot.val()) {
            //Save new user data in Users table if they don't exist
            var flName = user.firstName + " " + user.lastName;
            fbRef.getUsersRef().child(authData.uid).set({
              name: flName,
              email: user.email
            });
          }
        }, function(errorObject) {
          console.log("failed: " + errorObject);
        });
      });
     }).catch((function(err) {
       //Error codes through Firebase/AngularFire
       switch (err.code) {
        case "EMAIL_TAKEN":
          $scope.failedMessage = "Email is already taken.";
          break;
        case "INVALID_EMAIL":
          $scope.failedMessage = "Invalid Email.";
          break;
        default:
          $scope.failedMessage = "Error creating user.";
          break;
      }
     }).bind(this));
   };
 }
 /**
  * @name UpdatePasswordCtrl
  * @description Updates the user's password
  */
 function UpdatePasswordCtrl(auth, $location, ngDialog, $scope, email, tempPass) {
  
   $scope.updatePassword = function(user) {

     if(!user) {
       return false;
     }

     //Return if passwords don't match
     if(user.newPassword !== user.confirmNewPassword) {
       $scope.failedMessage = "Passwords do not match.";
       return false;
     }

     //Change Password using AngularFire API and Firebase
     auth.$changePassword({
       email       : email,
       oldPassword : tempPass,
       newPassword : user.newPassword
     }).then(function() {
       $location.path('/dashboard');
       ngDialog.closeAll();
       $scope.successMessage = "Successfully Changed Password";
     }).catch((function(err) {
       $scope.failedMessage = err.code;
     }).bind(this));
   };

 }

 /**
  * @name LoginCtrl
  * @description Authenticates the user's login
  */
 function LoginCtrl(auth, $location, ngDialog, $scope, fbRef, userService) {
   
   this.loggedIn = !!this.currentAuth;

   //Triggers when user presses login button
   this.login = function(user) {
     //Credentials are empty
     if(!user) {
       return false;
     }
     
     //Authorize user with email and password through Firebase API
     auth.$authWithPassword({
       email    : user.email,
       password : user.password
     }, {
       remember: "sessionOnly"
     }).then(function(authData) {
       
       //Set cookies to hold user data
       SetAdminAccess(authData,fbRef,userService);
       userService.setUserId(authData.uid);

       //Temporary password->redirect to update password
       if(authData.password.isTemporaryPassword) {
         ngDialog.open({
           templateUrl: '/views/updatePassword.html',
           controller: UpdatePasswordCtrl,
           //Pass email and password to UpdatePasswordCtrl controller
           resolve: {
             email: function emailFactory() {
               return authData.password.email;
             },
             tempPass: function passFactory() {
               return user.password;
             }
           }
         });
       } else {
         $location.path('/dashboard');
       }
     }).catch((function() {
       $scope.failedMessage = "Incorrect Email/Password Combination";
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

   //Google login -> Almost works
   /*this.googleLogin = function() {
     auth.$authWithOAuthRedirect("google", {
       remember: "sessionOnly",
       scope: "email"
     }).then(function() {
       $location.path('/');
     }).catch((function(err) {
       $scope.message = err.code;
     }).bind(this));
   };*/
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
   }).factory('userService', function($cookies) {
     //Stores user information for the session as a cookie
     $cookies.put('isAdmin',undefined);
     $cookies.put('uid','1');
     $cookies.put('userName',"Name");

     return {   
      getIsAdmin: function() {
        return $cookies.get('isAdmin');
      },
      setIsAdmin: function(value) {
        $cookies.put('isAdmin',value );
      },

      getUserId: function() {
        return $cookies.get('uid');
      },
      setUserId: function(value) {
        $cookies.put('uid',value);
      },

      getUserName: function() {
        return $cookies.get('userName');
      },
      setUserName: function(value) {
        $cookies.put('userName',value);
      },
     };
   });
