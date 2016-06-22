'use strict';

/**
 * !!!!!!!!!!IMPORTANT!!!!!!!!
 * We used firebase as for our realtime cloud database.
 * https://www.firebase.com/
 * AngularFire is the API used to communicate with firebase.
 * https://www.firebase.com/docs/web/libraries/angular/
 * Also used bootstrap for UI.
 * @TODO
 * Form validations/error messages on login, register, and forgotpassword
 * Update front end
 * Administrator account: <admin>
 *  View all users - SUPER EASY WITH FIREBASE DB
 *    *Remove users
 *    *Add users possibly?
 *    *View user's progress on training
 *  Ability to upload powerpoint slides and categorize them
 *    *Possible use of Google Drive API to view slides directly on website
 * </admin>
 *
 * Users account: <user>
 *  View/complete all trainings which notifies admin that one has been completed
 *  Should limit user's view to only see their specific trainings/Saggezza trainings
 *  Would like to add a profile page
 *  EMAIL CONFIRMATION. There is a 'hack' that could be used with angularfire.
 *  http://andreasmcdermott.com/web/2014/02/05/Email-verification-with-Firebase/
 *  Password Reset. NOT WORKING. AngularFire API sends reset password emails.
 * </user>
 *
 * General:
 * Security-As of now, people can read/write into the DB. Check out the
 * Security.js file for more info.
 *
 */
var app = angular
  .module('trainingPlatformApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ngRoute',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        template: '<login current-auth="$resolve.currentAuth"></login>',
        resolve: {
          currentAuth: function(auth) {
            return auth.$waitForAuth();
          }
        }
      })
      .when('/register', {
        template: '<register></register>'
      })
      .when('/', {
        template: '<dashboard></dashboard>',
        resolve: {
          currentAuth: function(auth) {
            return auth.$requireAuth();
          }
        }
      })
      //Not really a view. Needed to end session
      .when('/logout', {
        template: '<logout></logout>'
      })
      //NOT FINISHED. NEED TO ADD TEMPORARY PASSWORD ROUTE/PAGE
      .when('/forgotpassword', {
        template: '<forgotpassword></forgotpassword>'
      })
      .otherwise('/');
  });

  /**
   * @name app run
   * @description Requires that the user to be logged in to view any pages.
   * Redirects user to login page if not logged in
   */
app.run(function($rootScope, $location){
  $rootScope.$on("$routeChangeError", function(e, next, prev, err) {
    if(err === "AUTH_REQUIRED") {
      $location.path("/login");
    }
  });
});
