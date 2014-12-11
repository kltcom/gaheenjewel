'use strict';

angular.module('gaheenApp').controller('VerifyCtrl', function ($scope, Auth, $state) {
	$scope.$state = $state;
	$scope.errors = {};
	$scope.getCurrentUser = Auth.getCurrentUser;
	$scope.changeType = function () {
		$state.go('verify.' + $scope.user.type);
	};
	$scope.commit = function () {
	};
});
