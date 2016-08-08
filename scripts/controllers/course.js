/**
 * @name course.js
 * @description Controller for the course page. 
 */

'use strict';

/**
 * @name: CourseCtrl
 * @description: Controller for the courses. Gets the slide's embed code from Google Drive
 * and injects it into the course's html code. This function controls the specific training's 
 * video/powerpoint/etc.
 */
function CourseCtrl($scope, $sce,$location,courseService) {
  $scope.source = $sce.trustAsHtml(courseService.getCourseId());
  $scope.name = courseService.getCourseName();
}

angular.module('trainingPlatformApp')
   .component('course', {
     templateUrl: '/views/course.html',
     controller: CourseCtrl
   });