'use strict';

angular.module('gaheenApp').controller('QuestionnairePurveyorAboutCtrl', function ($scope, Auth, $location) {
	$scope.errors = {};
	$scope.commit = function (form) {
		$scope.submitted = true;
		if (form.$valid) {
			Auth.setAbout({
				description: $scope.user.description,
				missionStatement: $scope.user.missionStatement
			}).then(function () {
				$location.path('/questionnaire/purveyor/products');
			}).catch(function () {
				$scope.message = '';
			});
		}
	};
});
