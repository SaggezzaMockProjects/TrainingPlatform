'use strict';

function CourseCtrl($scope, $sce) {
	$scope.source=$sce.trustAsResourceUrl("https://docs.google.com/a/saggezza.com/presentation/d/1_2cIXepARn3W5tjr9PH6Sw2yfvJHmghL8vF0-7VYglc/embed?start=false&loop=false&delayms=3000");


  $scope.source2=$sce.trustAsResourceUrl("https://docs.google.com/a/saggezza.com/presentation/d/13CRp5_Cd3d3hC6Tuz4c6JoCGURR8Df23SJk-Of_55xg/embed?start=false&loop=false&delayms=3000");
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

