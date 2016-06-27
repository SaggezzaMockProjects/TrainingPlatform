'use strict';

/**
 * !!!!!!!!!!IMPORTANT!!!!!!!!
 * We used firebase as for our realtime cloud database.
 * https://www.firebase.com/
 * AngularFire is the API used to communicate with firebase.
 * https://www.firebase.com/docs/web/libraries/angular/
 * Also used bootstrap for UI.
 * @TODO
 * More advanced form validations/error messages on login, register, and forgot password
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
 * </user>
 *
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
    'firebase',
    'ngDialog'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        template: '<login current-auth="$resolve.currentAuth"></login>',
        resolve: {
          //Ensure no refreshing while waiting for database to respond
          currentAuth: function(auth) {
            return auth.$waitForAuth();
          }
        }
      })
      .when('/', {
        template: '<dashboard courses="$resolve.courses" hires="$resolve.hires" tech="$resolve.tech" compliance="$resolve.compliance" knowledge="$resolve.knowledge" general="$resolve.general"></dashboard>',
        resolve: {
          //Require authentication before going to this view
          courses: function(fbRef,$firebaseArray,auth) {
            return auth.$requireAuth().then(function() {
              var query = fbRef.getCoursesRef().orderByChild("name");
              return $firebaseArray(query).$loaded();
            });
          },

          hires: function(fbRef,$firebaseArray,auth) {
            return auth.$requireAuth().then(function() {
              var query = fbRef.getNewHireRef().orderByChild("name");
              return $firebaseArray(query).$loaded();
            });
          },

          tech: function(fbRef,$firebaseArray,auth) {
            return auth.$requireAuth().then(function() {
              var query = fbRef.getTechnicalRef().orderByChild("name");
              return $firebaseArray(query).$loaded();
            });
          },

          compliance: function(fbRef,$firebaseArray,auth) {
            return auth.$requireAuth().then(function() {
              var query = fbRef.getComplianceRef().orderByChild("name");
              return $firebaseArray(query).$loaded();
            });
          },

          knowledge: function(fbRef,$firebaseArray,auth) {
            return auth.$requireAuth().then(function() {
              var query = fbRef.GetKnowledgeRef().orderByChild("name");
              return $firebaseArray(query).$loaded();
            });
          },

          general: function(fbRef,$firebaseArray,auth) {
            return auth.$requireAuth().then(function() {
              var query = fbRef.getGeneralOpsRef().orderByChild("name");
              return $firebaseArray(query).$loaded();
            });
          }
        }
      })
      .when('/quiz', {
        template: '<quiz></quiz>',
        resolve: {
          //Require authentication before going to this view
          currentAuth: function(auth) {
            return auth.$requireAuth();
          }
        }
      })
      .when('/course', {
        template: '<course></course>',
        resolve: {
          //Require authentication before going to this view
          currentAuth: function(auth) {
            return auth.$requireAuth();
          }
        }
      })
      .when('/users', {
        template: '<users></users>',
        resolve: {
          //Require authentication before going to this view
          currentAuth: function(auth) {
            return auth.$requireAuth();
          }
        }
      })
      .when('/profile', {
        template: '<profile></profile>',
        resolve: {
          //Require authentication before going to this view
          currentAuth: function(auth) {
            return auth.$requireAuth();
          }
        }
      })
      //Not really a view. Needed to end session
      .when('/logout', {
        template: '<logout></logout>'
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
