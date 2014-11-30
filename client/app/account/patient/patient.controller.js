'use strict';

angular.module('gaheenApp').controller('PatientCtrl', function ($scope, $http) {
	$scope.errors = {};
	$scope.states = [
		'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
		'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
		'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia',
		'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
	];
	$scope.commit = function (form) {
		$scope.submitted = true;
		if (form.$valid) {

		}
	};
	$scope.drugs = function (query) {
		return $http.get('/api/drugs/' + query);
	};
	$scope.medicalConditions = function (query) {
		return $http.get('/api/medicalconditions/' + query);
	};
});
