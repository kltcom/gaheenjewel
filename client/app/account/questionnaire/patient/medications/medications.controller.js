'use strict';

angular.module('gaheenApp').controller('QuestionnairePatientMedicationsCtrl', function ($scope, $http, Auth, $location) {
	$scope.errors = {};
	$scope.commit = function (form) {
		$scope.submitted = true;
		if (form.$valid) {
			Auth.setMedications(_.flatten($scope.user.medications, '_id')).then(function () {
				$location.path('/questionnaire/' + Auth.getCurrentUser().type + '/medicalconditions');
			}).catch(function () {
				$scope.message = '';
			});
		}
	};
	$scope.drugs = function (query) {
		return $http.get('/api/drugs/' + query);
	};
});
