'use strict';

angular.module('gaheenApp').config(function ($stateProvider) {
	$stateProvider.state('login', {
		url: '/login',
		templateUrl: 'app/account/login/login.html',
		controller: 'LoginCtrl'
	}).state('signup', {
		url: '/signup',
		templateUrl: 'app/account/signup/signup.html',
		controller: 'SignupCtrl'
	}).state('settings', {
		url: '/settings',
		templateUrl: 'app/account/settings/settings.html',
		controller: 'SettingsCtrl',
		authenticate: true
	}).state('verify', {
		url: '/verify',
		templateUrl: 'app/account/verify/verify.html',
		controller: 'VerifyCtrl',
		authenticate: true
	}).state('patient', {
		url: '/patient',
		templateUrl: 'app/account/patient/patient.html',
		controller: 'PatientCtrl',
		authenticate: true
	});
});
