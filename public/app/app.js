angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function ($routeProvider, $locationProvider) {
	
	var routeRolesCheck = {
		admin: {
			auth: function(mvAuth) {
				return mvAuth.authorizeCurrentUserForRoute('admin');
			}
		}
	}

	$locationProvider.html5Mode(true);
	$routeProvider
		.when('/', { templateUrl: '/partials/main/main', controller: 'mvMainController' })
		.when('/admin/users', { 
			templateUrl: '/partials/admin/user-list', 
			controller: 'mvUserListController',
			resolve: routeRolesCheck.admin
		});
});

angular.module('app').run(function ($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
		if (rejection === 'not authorized') {
			$location.path('/');
		}
	});
})
