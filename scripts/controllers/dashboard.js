/**
 * @name Dashboard.js
 * @description Connects the dasboard view and controller together.
 */
'use strict';

/**
 * @name DashboardCtrl
 * @description Gets the course information from the selected training course
 */
function DashboardCtrl($scope,$http,$sce,$location,courseService) {

  //Get the info from course selected and store them in a service
  $scope.passCourse = function(course,category) {
    courseService.setCourseName(course.name);
    courseService.setCourseId(course.code);
    courseService.setCategory(category);
    
    $location.path('/course');
  };
}

 angular.module('trainingPlatformApp')
   .component('dashboard', {
     templateUrl: '/views/dashboard.html',
     bindings: {
       courses: '=',
     },
     controller: DashboardCtrl
   }).service('courseService',function($cookies) {
      /*Stores course information as cookies. Will need to fix this to ensure data isn't lost
      during refresh*/

      this.getCourseId = function() {
        return $cookies.get('courseId');
      };

      this.setCourseId = function(value) {
        $cookies.put('courseId',value, {expires:new Date(2017, 1, 1)})
      };

      this.getCategory = function() {
        return $cookies.get('category');
      };

      this.setCategory = function(value) {
        $cookies.put('category',value, {expires:new Date(2017, 1, 1)})
      };

      this.getCourseName = function() {
        return $cookies.get('courseName');
      };

      this.setCourseName = function(value) {
        $cookies.put('courseName',value,  {expires:new Date(2017, 1, 1)})
      };
   });