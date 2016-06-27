'use strict';

/**
 * @name fbUrl.js
 * @description Reference to the root node of the database
 */
var Firebase;
angular.module('trainingPlatformApp').constant('FirebaseUrl','https://training-platform.firebaseIO.com')
  .service('rootRef', ['FirebaseUrl', Firebase]);
