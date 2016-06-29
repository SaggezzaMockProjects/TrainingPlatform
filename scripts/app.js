'use strict';

/**
 * !!!!!!!!!!IMPORTANT!!!!!!!!
 * We used firebase as for our realtime cloud database.
 * https://www.firebase.com/
 * AngularFire is the API used to communicate with firebase.
 * https://www.firebase.com/docs/web/libraries/angular/
 * https://github.com/firebase/angularfire/blob/master/docs/reference.md#signinwithemailandpasswordemail-password --> AngularFire 2.
 *        We're still using angularfire 1.x.x
 * Also used bootstrap for UI.
 * @TODO
 * More advanced form validations/error messages on login, register, and forgot password
 * Administrator account: <admin>
 *  View all users - SUPER EASY WITH FIREBASE DB
 *    *Remove users---NEED TO UPDATE API
 *    *View user's progress on training
 * </admin>
 *
 * Users account: <user>
 *  View/complete all trainings which notifies admin that one has been completed
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
          //Ensure nothing changes while waiting for database to respond
          currentAuth: function(auth) {
            return auth.$waitForAuth();
          }
        }
      })
      .when('/', {
        template: '<dashboard courses="$resolve.courses" hires="$resolve.hires" tech="$resolve.tech" compliance="$resolve.compliance" knowledge="$resolve.knowledge" general="$resolve.general"></dashboard>',
        resolve: {
          //Require authentication and gather all the courses
          courses: function(fbRef,$firebaseArray,auth) {
            return auth.$requireAuth().then(function() {
              var query = fbRef.getCoursesRef().orderByChild("name");
              return $firebaseArray(query).$loaded();
            });
          },
          
          //New hire courses
          hires: function(fbRef,$firebaseArray,auth) {
            return auth.$requireAuth().then(function() {
              var query = fbRef.getNewHireRef().orderByChild("name");
              return $firebaseArray(query).$loaded();
            });
          },

          //Technical courses
          tech: function(fbRef,$firebaseArray,auth) {
            return auth.$requireAuth().then(function() {
              var query = fbRef.getTechnicalRef().orderByChild("name");
              return $firebaseArray(query).$loaded();
            });
          },
          
          //Compliance courses
          compliance: function(fbRef,$firebaseArray,auth) {
            return auth.$requireAuth().then(function() {
              var query = fbRef.getComplianceRef().orderByChild("name");
              return $firebaseArray(query).$loaded();
            });
          },

          //Knowledge Bank Courses
          knowledge: function(fbRef,$firebaseArray,auth) {
            return auth.$requireAuth().then(function() {
              var query = fbRef.GetKnowledgeRef().orderByChild("name");
              return $firebaseArray(query).$loaded();
            });
          },
          
          //General Operations Courses
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
        template: '<users users="$resolve.users" courses="$resolve.courses"></users>',
        resolve: {
          //Require authentication before going to this view
          currentAuth: function(auth) {
            return auth.$requireAuth();
          },

          //Require authentication and gather all the courses
          courses: function(fbRef,$firebaseArray,auth) {
            return auth.$requireAuth().then(function() {
              var query = fbRef.getCoursesRef().orderByChild("name");
              return $firebaseArray(query).$loaded();
            });
          },
          
          //All users
          users: function(fbRef,$firebaseArray,auth) {
            return auth.$requireAuth().then(function() {
              var query = fbRef.getUsersRef().orderByChild("name");
              return $firebaseArray(query).$loaded();
            });
          },
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
