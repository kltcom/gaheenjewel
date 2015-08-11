'use strict';

angular.module('gaheenApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('dashboard', {
				controller: 'DashboardCtrl',
				templateUrl: 'app/dashboard/dashboard.html',
				url: '/dashboard'
			});
	});
