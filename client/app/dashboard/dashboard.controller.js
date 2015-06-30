'use strict';

angular.module('gaheenApp')
	.controller('DashboardCtrl', function ($scope, Auth) {
		$scope.getCurrentUser = Auth.getCurrentUser;
		$scope.message = 'Hello';
	});
