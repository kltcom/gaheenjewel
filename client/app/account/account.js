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
		authenticate: false
	}).state('medications', {
		url: '/questionnaire/patient/medications',
		templateUrl: 'app/account/questionnaire/patient/medications/medications.html',
		controller: 'MedicationsCtrl',
		authenticate: true
	}).state('medicalconditions', {
		url: '/questionnaire/patient/medicalconditions',
		templateUrl: 'app/account/questionnaire/patient/medicalconditions/medicalconditions.html',
		controller: 'MedicalConditionsCtrl',
		authenticate: true
	}).state('strains', {
		url: '/questionnaire/patient/strains',
		templateUrl: 'app/account/questionnaire/patient/strains/strains.html',
		controller: 'StrainsCtrl',
		authenticate: true
	});
});
