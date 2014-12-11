'use strict';

angular.module('gaheenApp').controller('VerifyTransporterCtrl', function ($scope, Auth, $location, $upload) {
	$scope.currentYear = new Date().getFullYear();
	$scope.$parent.commit = function (form) {
		$scope.submitted = true;
		if (form.$valid) {
			/*
			Auth.setType({
				type: $scope.user.type,
				businessName: $scope.user.businessName,
				businessAddress1: $scope.user.businessAddress1,
				businessAddress2: $scope.user.businessAddress2,
				businessCity: $scope.user.businessCity,
				businessState: $scope.user.businessState,
				businessZipCode: $scope.user.businessZipCode,
				url: $scope.user.url
			}).then(function () {
				$location.path('/questionnaire/' + $scope.user.type + '/medications');
			}).catch(function () {
				$scope.message = '';
			});
			*/
		}
	};
	$scope.onFileSelect = function (image) {
		if (_.isArray(image)) image = image[0];
		if (image.type !== 'application/msword' && image.type !== 'application/pdf' && image.type !== 'image/jpeg' && image.type !== 'image/jpg') {
			alert('Unsupported file type.');
			return;
		}
		$scope.uploadInProgress = true;
		$scope.uploadProgress = 0;
		$scope.upload = $upload.upload({
			url: '/upload',
			method: 'POST',
			file: image
		}).progress(function (event) {
			$scope.uploadProgress = Math.floor(event.loaded / event.total);
			$scope.$apply();
		}).success(function (data, status, headers, config) {
			$scope.uploadInProgress = false;
			// If you need uploaded file immediately
			$scope.uploadedImage = JSON.parse(data);
		}).error(function (err) {
			$scope.uploadInProgress = false;
			console.log('Error uploading file: ' + err.message || err);
		});
	};
});
