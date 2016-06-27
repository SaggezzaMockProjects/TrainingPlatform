'use strict';

/**
 * @name Dashboard.js
 * @description Connects the dasboard view and controller together.
 ******NOT FINISHED*******
 */

function DashboardCtrl() {

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
