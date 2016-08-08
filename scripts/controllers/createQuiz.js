/**
 * @name createcourse.js
 * @description Admin Controller to create a course
 */

'use strict';

/**
 * @name CreateCourseCtrl
 * @description Adds the course to the Firebase DB
 */
 function CreateQuizCtrl(fbRef,$scope) {

 	//Triggers on button press
     this.createQuiz = function(course) {

     	if(!course.category) {
            $scope.failedMessage = "Please select a category";
            return false;
        }
     
}
 /**
  * Connect to view to the controller and module
  */
 angular.module('trainingPlatformApp')
   .component('createQuiz', {
     templateUrl: '/views/createQuiz.html',
     controller: CreateQuizCtrl,
     bindings: {
         courses: '='
     }
   });