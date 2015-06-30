'use strict';

angular.module('gaheenApp').controller('DashboardPatientOverviewCtrl', function ($scope, Auth) {
	$scope.getCurrentUser = Auth.getCurrentUser;
});
