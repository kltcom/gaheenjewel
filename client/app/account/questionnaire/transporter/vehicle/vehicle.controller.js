'use strict';

angular.module('gaheenApp').controller('QuestionnaireTransporterVehicleCtrl', function ($scope, Auth, $location, $upload) {
	$scope.errors = {};
	$scope.uploads = {};
	$scope.commit = function (form) {
		$scope.submitted = true;
		if (form.$valid) {
			/*
			Auth.setAbout({
				description: $scope.user.description,
				missionStatement: $scope.user.missionStatement
			}).then(function () {
				$location.path('/questionnaire/transporter/vehicle');
			}).catch(function () {
				$scope.message = '';
			});
			*/
		}
	};
	$scope.$watch('user.vehicleImages', function () {
		if (_.isUndefined($scope.user) || _.isUndefined($scope.user.vehicleImages)) return;
		var images = $scope.user.vehicleImages;
		for (var i = 0; i < images.length; i++) {
			var image = images[i];
			if (image.type !== 'image/jpeg' && image.type !== 'image/jpg') {
				alert('Unsupported file type.');
				return;
			}
			$scope.uploads[image.name] = {
				name: '',
				progress: 0
			};
			$scope.upload = $upload.upload({
				data: {
					id: Auth.getCurrentUser().id
				},
				file: image,
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				method: 'POST',
				url: '/upload'
			}).progress(function (event) {
				$scope.uploads[event.config.file.name].progress = Math.min(100, parseInt(100.0 * event.loaded / event.total));
			}).success(function (data, status, headers, config) {
				$scope.uploads[config.file.name].name = data;
			}).error(function (err) {
				//$scope.uploads[]
				//console.log('Error uploading file: ' + err.message || err);
			});
		}
	});
});
