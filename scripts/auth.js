'use strict';

/**
 * @name auth.js
 * @description Authorizes the Firebase DB and AngularFire API
 */
angular.module('trainingPlatformApp').factory('auth',function($firebaseAuth,rootRef) {
  return $firebaseAuth(rootRef);
});
