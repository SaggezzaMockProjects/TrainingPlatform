'use strict';

/**
 * @name Dashboard.js
 * @description Connects the dasboard view and controller together.
 ******NOT FINISHED*******
 */

function DashboardCtrl($scope,$http,$sce,$location) {
  $scope.score = 0;
  $scope.activeCourse = -1;
  $scope.activeCourseAnswered = 0;
  $scope.percentage = 0;

  $scope.menu = 0;
  $scope.sectionChosen = -1;

  this.training = function(slideURL,$scope,$location) {
    $location.path('/course');
  }
}

 angular.module('trainingPlatformApp')
   .component('dashboard', {
     templateUrl: '/views/dashboard.html',
     bindings: {
       courses: '=',
       hires: '=',
       general: '=',
       knowledge: '=',
       tech: '=',
       compliance: '='
     },
     controller: DashboardCtrl
   });