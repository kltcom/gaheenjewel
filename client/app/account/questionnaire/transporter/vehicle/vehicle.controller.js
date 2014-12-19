'use strict';

angular.module('gaheenApp').controller('QuestionnaireTransporterVehicleCtrl', function ($scope, Auth, $location, $http, $upload) {
	$scope.errors = {};
	$scope.images = [];
	$scope.commit = function (form) {
		$scope.submitted = true;
		if (form.$valid) {
			Auth.setVehicleImages(_.flatten($scope.images, 'newName')).then(function () {
				//$location.path('/questionnaire/transporter/vehicle');
			}).catch(function () {
				$scope.message = '';
			});
		}
	};
	$scope.delete = function (oldName, newName) {
		$http.delete('/data/' + newName).success(function () {
			var i = _.findIndex($scope.images, {newName: newName});
			$scope.images.splice(i, 1);
		}).error(function (err) {
		});
	};
	$scope.$watch('user.vehicleImages', function () {
		if (_.isUndefined($scope.user) || _.isUndefined($scope.user.vehicleImages)) return;
		var id = Auth.getCurrentUser().id;
		var images = $scope.user.vehicleImages;
		for (var i = 0; i < images.length; i++) {
			var image = images[i];
			$scope.images.push({
				newName: '',
				oldName: image.name,
				progress: 0,
				source: ''
			});
			var reader = new FileReader();
			reader.onload = function (i) {
				return function (e) {
					setTimeout(function () {
						$scope.$apply(function () {
							$scope.images[i].source = e.target.result;
						});
					}, 1);
				}
			}(i);
			reader.readAsDataURL(image);
			$scope.upload = $upload.upload({
				data: {
					id: id
				},
				file: image,
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				method: 'POST',
				url: '/upload'
			}).progress(function (event) {
				var i = _.findIndex($scope.images, {oldName: event.config.file.name});
				$scope.images[i].progress = Math.min(100, parseInt(100.0 * event.loaded / event.total));
			}).success(function (data, status, headers, config) {
				var i = _.findIndex($scope.images, {oldName: config.file.name});
				$scope.images[i].newName = data;
			}).error(function (err) {
			});
		}
	});
});
