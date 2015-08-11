'use strict';

angular.module('gaheenApp').controller('DiscoverPatientsCtrl', function ($scope, $http, User, Auth, $location) {
	$scope.errors = {};
	$http.get('/api/users/patients').success(function (data, status, headers, config) {
		$scope.patients = data;
	}).error(function (data, status, headers, config) {

	});
});
