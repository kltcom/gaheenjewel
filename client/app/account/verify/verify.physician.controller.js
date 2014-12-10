'use strict';

angular.module('gaheenApp').controller('VerifyPhysicianCtrl', function ($scope, Auth, $location) {
	$scope.states = [
		'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
		'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
		'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia',
		'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
	];
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
				businessPhone: $scope.user.businessPhone,
				businessFax: $scope.user.businessFax,
				url: $scope.user.url
			}).then(function () {
				$location.path('/questionnaire/' + $scope.user.type + '/medications');
			}).catch(function () {
				$scope.message = '';
			});
		}
	};
});
