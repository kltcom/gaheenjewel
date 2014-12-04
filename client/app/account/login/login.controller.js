'use strict';

angular.module('gaheenApp').controller('LoginCtrl', function ($scope, Auth, $location) {
	$scope.errors = {};
	$scope.user = {};
	$scope.commit = function (form) {
		$scope.submitted = true;
		if (form.$valid) {
			Auth.login({
				email: $scope.user.email,
				password: $scope.user.password
			}).then(function () {
				if(Auth.getCurrentUser.verified)
					$location.path('/');
				else
					$location.path('/verify');
			}).catch(function (err) {
				$scope.errors.other = err.message;
			});
		}
	};
});
