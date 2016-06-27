'use strict';

 angular.module('trainingPlatformApp').component('dashboard', {
     templateUrl: '/views/dashboard.html',
     controller: DashboardController
	});

function DashboardController($scope,$http,$sce,$location) {
	$scope.score = 0;
	$scope.activeCourse = -1;
	$scope.activeCourseAnswered = 0;
	$scope.percentage = 0;

	$scope.menu = 0;
	$scope.sectionChosen = -1;

	$http.get('data/course_data.json').then(function(courseData){
		$scope.sections = courseData.data;
		//$scope.totalSections = $scope.section.length;
	});
	
	$scope.findCourses = function(courseIndex){

			alert(courseIndex);
			$scope.menu = 1;
			$scope.sectionChosen = courseIndex;
	};

	$scope.goToQuiz = function(){
		$location.path('/course');
	};

}

/**
 * @name Dashboard.js
 * @description Connects the dasboard view and controller together.
 ******NOT FINISHED*******
 */





