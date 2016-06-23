'use strict';

/**
 * @name fbUrl.js
 * @description URL for the Firebase. Needed to access the Database.
 */
var Firebase;
angular.module('trainingPlatformApp').constant('FirebaseUrl','https://training-platform.firebaseIO.com')
  .service('rootRef', ['FirebaseUrl', Firebase]);
