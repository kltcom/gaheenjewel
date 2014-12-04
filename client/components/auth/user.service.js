'use strict';

angular.module('gaheenApp').factory('User', function ($resource) {
	return $resource('/api/users/:id/:controller', {
		id: '@_id'
	}, {
		get: {
			method: 'GET',
			params: {
				id: 'me'
			}
		},
		setMedicalConditions: {
			method: 'PUT',
			params: {
				controller: 'medicalconditions'
			}
		},
		setMedications: {
			method: 'PUT',
			params: {
				controller: 'medications'
			}
		},
		setPassword: {
			method: 'PUT',
			params: {
				controller: 'password'
			}
		},
		setType: {
			method: 'PUT',
			params: {
				controller: 'type'
			}
		}
	});
});
