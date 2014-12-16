'use strict';

angular.module('gaheenApp').controller('QuestionnairePurveyorAboutCtrl', function ($scope, $http, Auth, $location) {
	$scope.errors = {};
	$scope.commit = function (form) {
		$scope.submitted = true;
		if (form.$valid) {

		}
	};
});
