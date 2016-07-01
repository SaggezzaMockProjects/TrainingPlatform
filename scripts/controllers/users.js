'use strict';
 function ConfirmUserDialogCtrl($scope,name,message) {
    $scope.message = message;
    $scope.name = name;
 }
 
 function OpenDialog(user,wording,ngDialog,action,fbRef) {
    //Confirm dialog
    ngDialog.openConfirm({
        templateUrl: '/views/confirm.html',
        controller: ConfirmUserDialogCtrl,
        //Pass user name and message to dialog
        resolve: {
            name: function nameFactory() {
                return user.name;
            },
            message: function messageFactory() {
                return wording;
            }
        }
    }).then(function(success) {
        switch (action) {
            case 'Delete':
            //Do nothing until we update to AngularFire 2/ Firebase 3
                break;
            case 'Admin':
               //Do nothing for now
                break;
            default:
                break;
        }
    });  

 }

 function UsersCtrl(ngDialog,fbRef) {
     //var usersObj = [];
     /*fbRef.getComplianceRef().on("value",function(snapshot) {
         snapshot.forEach(function(childSnapShot) {
             childSnapShot.forEach(function(smallChildSnapShot) {
                 
             });
         });
     });*/

     
     /*fbRef.getCoursesRef().on("value", function(snapshot) {
         snapshot.forEach(function(childSnapShot) {
             childSnapShot.child("users")
         });
     });*/

     //Delete user from database 
     this.deleteUser = function(user) {
        OpenDialog(user,"delete",ngDialog,"Delete",fbRef);
     };

     //Promote user to admin functionality
     this.promoteUser = function(user) {
        OpenDialog(user,"promote",ngDialog,"Admin",fbRef);  
     };
 }

 angular.module('trainingPlatformApp')
   .component('users', {
     templateUrl: '/views/users.html',
     controller: UsersCtrl,
     bindings: {
         users: '=',
         courses: '='
     }
   });