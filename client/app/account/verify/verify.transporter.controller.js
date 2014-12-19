'use strict';

angular.module('gaheenApp').controller('VerifyTransporterCtrl', function ($scope, Auth, $location, $upload) {
	$scope.currentYear = new Date().getFullYear();
	$scope.$parent.commit = function (form) {
		$scope.submitted = true;
		if (form.$valid) {
			Auth.setType({
				type: $scope.user.type,
				driversName: $scope.user.driversName,
				driversLicenseNumber: $scope.user.driversLicenseNumber,
				driversLicenseImage: $scope.image.newName,
				vehicleMake: $scope.user.vehicleMake,
				vehicleModel: $scope.user.vehicleModel,
				vehicleYear: $scope.user.vehicleYear,
				vehicleRegistrationNumber: $scope.user.vehicleRegistrationNumber,
				vehicleInsurancePolicyNumber: $scope.user.vehicleInsurancePolicyNumber
			}).then(function () {
				$location.path('/questionnaire/transporter/about');
			}).catch(function () {
				$scope.message = '';
			});
		}
	};
	$scope.$watch('user.driversLicenseImage', function () {
		if (_.isUndefined($scope.user) || _.isUndefined($scope.user.driversLicenseImage) || !_.isArray($scope.user.driversLicenseImage)) return;
		var image = $scope.user.driversLicenseImage[0];
		$scope.image = {
			newName: '',
			oldName: image.name,
			progress: 0,
			source: ''
		};
		var reader = new FileReader();
		reader.onload = function (e) {
			setTimeout(function () {
				$scope.$apply(function () {
					$scope.image.source = e.target.result;
				});
			}, 1);
		};
		reader.readAsDataURL(image);
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
			$scope.image.progress = Math.min(100, parseInt(100.0 * event.loaded / event.total));
		}).success(function (data, status, headers, config) {
			$scope.image.newName = data;
		}).error(function (err) {
		});
	});
});
