'use strict';

angular.module('gaheenApp').controller('QuestionnaireTransporterVehicleCtrl', function ($scope, Auth, $location, $http, $upload) {
	$scope.errors = {};
	$scope.uploads = {};
	$scope.commit = function (form) {
		$scope.submitted = true;
		if (form.$valid) {
			Auth.setVehicleImages(_.flatten($scope.uploads, 'name')).then(function () {
				//$location.path('/questionnaire/transporter/vehicle');
			}).catch(function () {
				$scope.message = '';
			});
		}
	};
	$scope.delete = function (oldName, newName) {
		$http.delete('/data/' + newName).success(function () {
			delete $scope.uploads[oldName];
		}).error(function (err) {
		});
	};
	$scope.$watch('user.vehicleImages', function () {
		if (_.isUndefined($scope.user) || _.isUndefined($scope.user.vehicleImages)) return;
		var images = $scope.user.vehicleImages;
		for (var i = 0; i < images.length; i++) {
			var image = images[i];
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
			});
		}
	});
});
