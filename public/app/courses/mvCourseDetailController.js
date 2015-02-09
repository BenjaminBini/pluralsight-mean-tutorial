angular.module('app').controller('mvCourseDetailController', function ($scope, mvCachedCourses, $routeParams) {
	mvCachedCourses.query().$promise.then(function(courseList) {
		courseList.some(function (course) {
			if (course._id == $routeParams.id) {
				$scope.course = course;
				return true;
			}
		});
	});
});