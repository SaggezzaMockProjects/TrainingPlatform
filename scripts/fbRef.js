'use strict';

angular.module('trainingPlatformApp').factory('fbRef', function(rootRef) {
  return {
    getUsersRef: function() {
      return rootRef.child('Users');
    },
    getCoursesRef: function() {
      return rootRef.child('Courses');
    },
    getNewHireRef: function() {
      return rootRef.child('Courses').child('New Hire');
    },
    getComplianceRef: function() {
      return rootRef.child('Courses').child('Compliance');
    },
    getTechnicalRef: function() {
      return rootRef.child('Courses').child('Technical');
    },
    getGeneralOpsRef: function() {
      return rootRef.child('Courses').child('General Operations');
    },
    GetKnowledgeRef: function() {
      return rootRef.child('Courses').child('Knowledge Bank');
    },
    getAdminRef: function() {
      return rootRef.child('Admins');
    }
  };
});
