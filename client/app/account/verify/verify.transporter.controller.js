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

	$scope.$watch('user.driversLicenseImage', function () {
		var image = $scope.user.driversLicenseImage;
		if (!_.isArray(image)) return;
		image = image[0];
		//if (image.type !== 'application/msword' && image.type !== 'application/pdf' && image.type !== 'image/jpeg' && image.type !== 'image/jpg') {
		//	alert('Unsupported file type.');
		//	return;
		//}
		$scope.upload = $upload.upload({
			url: '/upload', // upload.php script, node.js route, or servlet url
			method: 'POST',
			headers: {
				'Content-Type': 'multipart/form-data'
			}, //headers: {'Authorization': 'xxx'}, // only for html5
			//withCredentials: true,
			//data: {myObj: $scope.myModelObj},
			file: image // single file or a list of files. list is only for html5
			//fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
			//fileFormDataName: myFile, // file formData name ('Content-Disposition'), server side request form name
			// could be a list of names for multiple files (html5). Default is 'file'
			//formDataAppender: function(formData, key, val){}  // customize how data is added to the formData.
			// See #40#issuecomment-28612000 for sample code
		}).progress(function (evt) {
			console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :' + evt.config.file.name);
		}).success(function (data, status, headers, config) {
			// file is uploaded successfully
			console.log('file ' + config.file.name + 'is uploaded successfully. Response: ' + data);
		});
		//.error(...)
		//.then(success, error, progress); // returns a promise that does NOT have progress/abort/xhr functions
		//.xhr(function(xhr){xhr.upload.addEventListener(...)}) // access or attach event listeners to
		//the underlying XMLHttpRequest
		/* alternative way of uploading, send the file binary with the file's content-type.
		   Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed.
		   It could also be used to monitor the progress of a normal http post/put request.
		   Note that the whole file will be loaded in browser first so large files could crash the browser.
		   You should verify the file size before uploading with $upload.http().
		*/
		// $scope.upload = $upload.http({...})  // See 88#issuecomment-31366487 for sample code.

	});
	/*
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
	*/
});
