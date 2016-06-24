'use strict';

/**
 * @name logout.js
 * @description Logs out the user
 */

angular.module('trainingPlatformApp').component('logout', {
  controller: function(auth, $location) {
    //Log out using Firebase/AngularFire API
    auth.$unauth();
    $location.path('/');
  }
});
