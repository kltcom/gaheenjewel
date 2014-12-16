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
				driversLicenseImage: $scope.uploadedImage,
				vehicleMake: $scope.user.vehicleMake,
				vehicleModel: $scope.user.vehicleModel,
				vehicleYear: $scope.user.vehicleYear,
				vehicleRegistrationNumber: $scope.user.vehicleRegistrationNumber,
				vehicleInsurancePolicyNumber: $scope.user.vehicleInsurancePolicyNumber
			}).then(function () {
				$location.path('/questionnaire/transporter/info');
			}).catch(function () {
				$scope.message = '';
			});
		}
	};
	$scope.$watch('user.driversLicenseImage', function () {
		var image = $scope.user.driversLicenseImage;
		if (!_.isArray(image)) return;
		image = image[0];
		if (image.type !== 'application/msword' && image.type !== 'application/pdf' && image.type !== 'image/jpeg' && image.type !== 'image/jpg') {
			alert('Unsupported file type.');
			return;
		}
		$scope.uploadInProgress = true;
		$scope.uploadProgress = 0;
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
			$scope.uploadProgress = Math.min(100, parseInt(100.0 * event.loaded / event.total));
			//console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :' + evt.config.file.name);
		}).success(function (data, status, headers, config) {
			//console.log('file ' + config.file.name + 'is uploaded successfully. Response: ' + data);
			$scope.uploadInProgress = false;
			$scope.uploadedImage = data;
		}).error(function (err) {
			$scope.uploadInProgress = false;
			//console.log('Error uploading file: ' + err.message || err);
		});
	});
});
