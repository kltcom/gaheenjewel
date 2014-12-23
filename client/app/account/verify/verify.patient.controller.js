'use strict';

angular.module('gaheenApp').controller('VerifyPatientCtrl', function ($scope, Auth, $location) {
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
				username: $scope.user.username,
				address1: $scope.user.address1,
				address2: $scope.user.address2,
				city: $scope.user.city,
				state: $scope.user.state,
				zipCode: $scope.user.zipCode
			}).then(function () {
				$location.path('/questionnaire/patient/medications');
			}).catch(function () {
				$scope.message = '';
			});
		}
	};
});
