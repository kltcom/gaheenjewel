'use strict';

angular.module('gaheenApp').factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, $q) {
	var currentUser = {};
	if ($cookieStore.get('token')) currentUser = User.get();
	return {
		/**
		 * Authenticate user and save token
		 *
		 * @param  {Object}   user
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		login: function (user, callback) {
			var cb = callback || angular.noop;
			var deferred = $q.defer();

			$http.post('/auth/local', {
				email: user.email,
				password: user.password
			}).success(function (data) {
				$cookieStore.put('token', data.token);
				currentUser = User.get();
				deferred.resolve(data);
				return cb();
			}).error(function (err) {
				this.logout();
				deferred.reject(err);
				return cb(err);
			}.bind(this));

			return deferred.promise;
		},

		/**
		 * Delete access token and user info
		 *
		 * @param  {Function}
		 */
		logout: function () {
			$cookieStore.remove('token');
			currentUser = {};
		},

		/**
		 * Create a user
		 *
		 * @param  {Object}   user
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		createUser: function (user, callback) {
			var cb = callback || angular.noop;

			return User.save(user, function (data) {
				$cookieStore.put('token', data.token);
				currentUser = User.get();
				return cb(user);
			}, function (err) {
				this.logout();
				return cb(err);
			}.bind(this)).$promise;
		},

		/**
		 * Set a user's description and/or mission statement
		 *
		 * @param  {String}   description
		 * @param  {String}   missionStatement
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		setAbout: function (description, missionStatement, callback) {
			var cb = callback || angular.noop;

			return User.setAbout({id: currentUser._id}, {
				description: description,
				missionStatement: missionStatement
			}, function (user) {
				return cb(user);
			}, function (err) {
				return cb(err);
			}).$promise;
		},

		/**
		 * Set a user's medical conditions
		 *
		 * @param  {Array}    medicalConditions
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		setMedicalConditions: function (medicalConditions, callback) {
			var cb = callback || angular.noop;

			return User.setMedicalConditions({id: currentUser._id}, {
				medicalConditions: medicalConditions
			}, function (user) {
				return cb(user);
			}, function (err) {
				return cb(err);
			}).$promise;
		},

		/**
		 * Set a user's medications
		 *
		 * @param  {Array}    medications
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		setMedications: function (medications, callback) {
			var cb = callback || angular.noop;

			return User.setMedications({id: currentUser._id}, {
				medications: medications
			}, function (user) {
				return cb(user);
			}, function (err) {
				return cb(err);
			}).$promise;
		},

		/**
		 * Set a user's password
		 *
		 * @param  {String}   oldPassword
		 * @param  {String}   newPassword
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		setPassword: function (oldPassword, newPassword, callback) {
			var cb = callback || angular.noop;

			return User.setPassword({id: currentUser._id}, {
				oldPassword: oldPassword,
				newPassword: newPassword
			}, function (user) {
				return cb(user);
			}, function (err) {
				return cb(err);
			}).$promise;
		},

		/**
		 * Set a user's type
		 *
		 * @param  {Object}   user
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		setType: function (user, callback) {
			var cb = callback || angular.noop;

			return User.setType({id: currentUser._id}, user, function (user) {
				return cb(user);
			}, function (err) {
				return cb(err);
			}).$promise;
		},

		/**
		 * Set a user's vehicle images
		 *
		 * @param  {Array}    vehicleImages
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		setVehicleImages: function (vehicleImages, callback) {
			var cb = callback || angular.noop;

			return User.setVehicleImages({id: currentUser._id}, {
				vehicleImages: vehicleImages
			}, function (user) {
				return cb(user);
			}, function (err) {
				return cb(err);
			}).$promise;
		},

		/**
		 * Get all available info on authenticated user
		 *
		 * @return {Object} user
		 */
		getCurrentUser: function () {
			return currentUser;
		},

		/**
		 * Check if a user is logged in
		 *
		 * @return {Boolean}
		 */
		isLoggedIn: function () {
			return currentUser.hasOwnProperty('role');
		},

		/**
		 * Wait for currentUser to resolve before checking if user is logged in
		 */
		isLoggedInAsync: function (cb) {
			if (currentUser.hasOwnProperty('$promise')) currentUser.$promise.then(function () {
				cb(true);
			}).catch(function () {
				cb(false);
			});
			else if (currentUser.hasOwnProperty('role')) cb(true);
			else cb(false);
		},

		/**
		 * Check if a user is an admin
		 *
		 * @return {Boolean}
		 */
		isAdmin: function () {
			return currentUser.role === 'admin';
		},

		/**
		 * Get auth token
		 */
		getToken: function () {
			return $cookieStore.get('token');
		}
	};
});
