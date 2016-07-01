/**
 * @name createcourse.js
 * @description Admin Controller to create a course
 */

'use strict';

/**
 * @name CreateCourseCtrl
 * @description Adds the course to the Firebase DB
 */
 function CreateCourseCtrl(fbRef,$scope) {
     
     //Triggers on button press
     this.createCourse = function(course) {

         //Error if user doesn't select a category
         if(!course.category) {
             $scope.failedMessage = "Please select a category";
             return false;
         }

         //Check to see if course exists in DB
         var courseRef = fbRef.getCoursesRef();
         courseRef.once("value", function(snapshot) {
             if(snapshot.child(course.category).hasChild(course.name)) {
                 $scope.failedMessage = "Course name already taken";
                 return false;
             } else {
                 //Write to the DB if course doesn't exist
                 courseRef.child(course.category).child(course.name).set({
                     code: course.slideId,
                     name: course.name
                 });
                 $scope.successMessage = "Successfully created " + course.name;
             }
         });
     };
 }
 
 /**
  * Connect to view to the controller and module
  */
 angular.module('trainingPlatformApp')
   .component('createcourse', {
     templateUrl: '/views/createcourse.html',
     controller: CreateCourseCtrl,
     bindings: {
         courses: '='
     }
   });