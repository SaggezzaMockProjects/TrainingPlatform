'use strict';


 function CreateCourseCtrl(fbRef,$scope) {
     this.createCourse = function(course) {
         if(!course.category) {
             $scope.failedMessage = "Please select a category";
             return false;
         }
         var courseRef = fbRef.getCoursesRef();
         courseRef.once("value", function(snapshot) {
             if(snapshot.child(course.category).hasChild(course.name)) {
                 $scope.failedMessage = "Course name already taken";
                 return false;
             } else {
                 courseRef.child(course.category).child(course.name).set({
                     code: course.slideId,
                     name: course.name
                 });
                 $scope.successMessage = "Successfully created " + course.name;
             }
         });
     };
 }
 
 angular.module('trainingPlatformApp')
   .component('createcourse', {
     templateUrl: '/views/createcourse.html',
     controller: CreateCourseCtrl,
     bindings: {
         courses: '='
     }
   });