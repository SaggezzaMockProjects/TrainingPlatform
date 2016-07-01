'use strict';

/**
 * @name auth.js
 * @description Authenticates a Firebase client
 */
angular.module('trainingPlatformApp').factory('auth',function($firebaseAuth,rootRef) {
  return $firebaseAuth(rootRef);
});
