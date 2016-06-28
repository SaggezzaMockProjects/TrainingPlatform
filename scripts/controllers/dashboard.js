'use strict';

/**
 * @name Dashboard.js
 * @description Connects the dasboard view and controller together.
 ******NOT FINISHED*******
 */

function DashboardCtrl() {
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