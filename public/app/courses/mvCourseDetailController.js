angular.module('app').controller('mvCourseDetailController', function ($scope, mvCachedCourses, $routeParams) {
	mvCachedCourses.query().$promise.then(function(courseList) {
		courseList.some(function (course) {
			$scope.course = course;
			return true;
		});
	});
});