'use strict';

angular.module('gaheenApp').controller('VerifyTransporterCtrl', function ($scope, Auth, $location) {
	$scope.currentYear = new Date().getFullYear();
	$scope.$parent.commit = function (form) {
		$scope.submitted = true;
		if (form.$valid) {
			Auth.setType({
				type: $scope.user.type,
				businessName: $scope.user.businessName,
				businessAddress1: $scope.user.businessAddress1,
				businessAddress2: $scope.user.businessAddress2,
				businessCity: $scope.user.businessCity,
				businessState: $scope.user.businessState,
				businessZipCode: $scope.user.businessZipCode,
				url: $scope.user.url
			}).then(function () {
				$location.path('/questionnaire/' + $scope.user.type + '/medications');
			}).catch(function () {
				$scope.message = '';
			});
		}
	};
});
