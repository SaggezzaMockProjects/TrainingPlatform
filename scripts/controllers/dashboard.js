'use strict';

/**
 * @name Dashboard.js
 * @description Connects the dasboard view and controller together.
 ******NOT FINISHED*******
 */

function DashboardCtrl($scope,$http,$sce,$location,courseService) {
  $scope.score = 0;
  $scope.activeCourse = -1;
  $scope.activeCourseAnswered = 0;
  $scope.percentage = 0;

  $scope.menu = 0;
  $scope.sectionChosen = -1;

  this.training = function(slideURL,$scope,$location) {
    $location.path('/course');
  };

  $scope.passCourse = function(course) {
    courseService.setCourseName(course.name);
    courseService.setCourseId(course.code);
    $location.path('/course');
  };


  $scope.initCourse = function(InCourseName){
    $scope.$broadcast("myEvent", {courseName: InCourseName });
  };

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
   }).service('courseService',function() {
     var _courseId = "1";
     var _courseName = "Course";

     this.getCourseId = function() {
       return _courseId;
     };

     this.setCourseId = function(value) {
       _courseId = value;
       console.log(_courseId);
     };

     this.getCourseName = function() {
       return _courseName;
     };

     this.setCourseName = function(value) {
       _courseName = value;
     };
   });