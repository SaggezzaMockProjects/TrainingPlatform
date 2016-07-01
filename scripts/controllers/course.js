'use strict';

function CourseCtrl($scope, $sce,$location,courseService,userService) {
  $scope.source = $sce.trustAsHtml(courseService.getCourseId());
  $scope.name = courseService.getCourseName();
  console.log(userService.getUserId());
}

angular.module('trainingPlatformApp')
   .component('course', {
     templateUrl: '/views/course.html',
     controller: CourseCtrl
   });