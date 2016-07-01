'use strict';

/**
 * Main application java script file. Handle routes here.
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
    'ngDialog',
    'ngCookies'
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
        template: '<dashboard courses="$resolve.courses"></dashboard>',
        resolve: {
          //Require authentication and gather all the courses
          courses: function(fbRef,$firebaseArray,auth) {
            return auth.$requireAuth().then(function() {
              var query = fbRef.getCoursesRef().orderByChild("name");
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
      .when('/createcourse', {
        template: '<createcourse courses="$resolve.courses"></createcourse>',
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
