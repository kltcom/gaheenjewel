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
