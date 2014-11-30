'use strict';

angular.module('gaheenApp').controller('SignupCtrl', function ($scope, Auth, $location) {
	$scope.errors = {};
	$scope.user = {};
	$scope.commit = function (form) {
		$scope.submitted = true;
		if (form.$valid) {
			Auth.createUser({
				firstName: $scope.user.firstName,
				lastName: $scope.user.lastName,
				email: $scope.user.email,
				password: $scope.user.password
			}).then(function () {
				$location.path('/verify');
			}).catch(function (err) {
				err = err.data;
				$scope.errors = {};

				// Update validity of form fields that match the mongoose errors
				angular.forEach(err.errors, function (error, field) {
					form[field].$setValidity('mongoose', false);
					$scope.errors[field] = error.message;
				});
			});
		}
	};
});
