'use strict';

angular.module('gaheenApp').factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, $q) {
	var currentUser = {};
	if ($cookieStore.get('token')) currentUser = User.get();
	return {
		/**
		 * Authenticate user and save token
		 *
		 * @param  {Object}   user     - login info
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
		 * Create a new user
		 *
		 * @param  {Object}   user     - user info
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
		 * Set password
		 *
		 * @param  {String}   oldPassword
		 * @param  {String}   newPassword
		 * @param  {Function} callback    - optional
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
		 * Set type
		 *
		 * @param  {String}   type
		 * @param  {Function} callback    - optional
		 * @return {Promise}
		 */
		setType: function (type, callback) {
			var cb = callback || angular.noop;

			return User.setType({id: currentUser._id}, {
				type: type
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
