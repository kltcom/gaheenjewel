'use strict';

angular.module('gaheenApp').controller('MainCtrl', function ($scope) {
	$scope.myInterval = 3000;
	$scope.slides = [
		{
			image: '/assets/images/placeholder-1.jpg'
		}, {
			image: '/assets/images/placeholder-2.jpg'
		}, {
			image: '/assets/images/placeholder-3.jpg'
		}, {
			image: '/assets/images/placeholder-4.jpg'
		}, {
			image: '/assets/images/placeholder-5.jpg'
		}, {
			image: '/assets/images/placeholder-6.jpg'
		}
	];

	});