'use strict';

angular.module('gaheenApp').controller('DashboardNotificationsCtrl', function ($scope, $location, Auth) {
	$scope.getCurrentUser = Auth.getCurrentUser;
	$scope.isAdmin = Auth.isAdmin;
	$scope.isCollapsed = true;
	$scope.isLoggedIn = Auth.isLoggedIn;
	$scope.menu = [
		{
			'title': 'Home',
			'link': '/'
		}
	];
	$scope.isActive = function (route) {
		return route === $location.path();
	};
	$scope.logout = function () {
		Auth.logout();
		$location.path('/login');
	};
});
