/**
 * @name fbRef.js
 * @description References to each node of the DB
 */

'use strict';

/**
 * @description Creates a service/factory to gain access to the DB
 */
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
    getKnowledgeRef: function() {
      return rootRef.child('Courses').child('Knowledge Bank');
    },
    getAdminRef: function() {
      return rootRef.child('Admins');
    },
    getParmFourRef: function(one, two, three, four) {
      return rootRef.child(one).child(two).child(three).child(four);
    }

  };
});
