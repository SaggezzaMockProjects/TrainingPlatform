'use strict';

function CourseCtrl($scope, $sce,$location,courseService) {
  console.log("Before: " + courseService.getCourseId());
	$scope.source=$sce.trustAsResourceUrl(courseService.getCourseId());
  console.log($scope.source);

  $scope.openCourse = function(courseName) {
    console.log("open course")
    $location.path('/course');
  };

  $scope.$on("myEvent", function (event, args) {
    $scope.rest_id = args.courseName;
    $scope.getMainCategories();
    $location.path('#course');
  });
}

angular.module('trainingPlatformApp')
   .component('course', {
     templateUrl: '/views/course.html',

       bindings: {
       courses: '=',
       hires: '=',
       general: '=',
       knowledge: '=',
       tech: '=',
       compliance: '='
     },
     controller: CourseCtrl
   });