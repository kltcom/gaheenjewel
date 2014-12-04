'use strict';

angular.module('gaheenApp').controller('MedicalConditionsCtrl', function ($scope, $http, Auth, $location) {
	$scope.errors = {};
	$scope.commit = function (form) {
		$scope.submitted = true;
		if (form.$valid) {
			Auth.setMedicalConditions(_.flatten($scope.user.medicalConditions, '_id')).then(function () {
				$location.path('/questionnaire/' + Auth.getCurrentUser().type + '/strains');
			}).catch(function () {
				$scope.message = '';
			});
		}
	};
	$scope.medicalConditions = function (query) {
		return $http.get('/api/medicalconditions/' + query);
	};
});
