'use strict';

angular.module('gaheenApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('discover', {
				controller: 'DiscoverCtrl',
				templateUrl: 'app/discover/discover.html',
				url: '/discover'
			});
	});
