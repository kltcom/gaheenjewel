'use strict';

angular.module('gaheenApp').controller('VerifyCtrl', function ($scope, Auth, $location) {
	$scope.commit = function (form) {
		$scope.submitted = true;
		if (form.$valid) {
			Auth.setType($scope.user.type).then(function () {
				$location.path('/' + $scope.user.type);
			}).catch(function () {
				$scope.message = '';
			});
		}
	};
});
