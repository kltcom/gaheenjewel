'use strict';

angular.module('gaheenApp').controller('DashboardMedicalConditionsCtrl', function ($scope, Auth) {
	$scope.getCurrentUser = Auth.getCurrentUser;
});
