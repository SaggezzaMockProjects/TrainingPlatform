'use strict';

angular.module('trainingPlatformApp').factory('fbRef', function(rootRef, auth) {
  return {
    getUsersRef: function() {
      return rootRef.child('users').child(auth.$getAuth().uid);
    }
  };
});
