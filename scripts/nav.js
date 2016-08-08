/**
 * @name nav.js
 * @description navigation bar that appears at top of page after user logs in
 */

'use strict';

/**
 * @name NavCtrl
 * @description Set permissions on the nav bar
 */
function NavCtrl(userService,$scope) {
  $scope.isAdmin = userService.getIsAdmin();
  $scope.name = userService.getUserName();
}

angular.module('trainingPlatformApp').component('nav', {
  templateUrl: '/views/nav.html',
  controller: NavCtrl
});
