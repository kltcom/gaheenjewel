'use strict';

angular.module('gaheenApp').controller('SettingsCtrl', function ($scope, User, Auth) {
	$scope.errors = {};
	$scope.commit = function (form) {
		$scope.submitted = true;
		if (form.$valid) {
			Auth.setPassword($scope.user.oldPassword, $scope.user.newPassword).then(function () {
				$scope.message = 'Password changed successfully.';
			}).catch(function () {
				form.password.$setValidity('mongoose', false);
				$scope.errors.other = 'Invalid password.';
				$scope.message = '';
			});
		}
	};
});
