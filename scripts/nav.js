'use strict';

/**
 * @name nav.js
 * @description navigation bar that appears at top of page after user logs in
 */

function NavCtrl(userService,$scope) {
  $scope.isAdmin = userService.getIsAdmin();
}

angular.module('trainingPlatformApp').component('nav', {
  templateUrl: '/views/nav.html',
  controller: NavCtrl
});
