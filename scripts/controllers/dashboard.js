'use strict';

/**
 * @name Dashboard.js
 * @description Connects the dasboard view and controller together.
 */

function DashboardCtrl($scope,$http,$sce,$location,courseService) {
  $scope.score = 0;
  $scope.activeCourse = -1;
  $scope.activeCourseAnswered = 0;
  $scope.percentage = 0;

  $scope.menu = 0;
  $scope.sectionChosen = -1;

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
      $cookies.put('courseId',"1");
      $cookies.put('courseName',"Course");
      $cookies.put('category',"something");

      this.getCourseId = function() {
        return $cookies.get('courseId');
      };

      this.setCourseId = function(value) {
        $cookies.put('courseId',value);
      };

      this.getCategory = function() {
        return $cookies.get('category');
      };

      this.setCategory = function(value) {
        $cookies.put('category',value);
      };

      this.getCourseName = function() {
        return $cookies.get('courseName');
      };

      this.setCourseName = function(value) {
        $cookies.put('courseName',value);
      };
   });