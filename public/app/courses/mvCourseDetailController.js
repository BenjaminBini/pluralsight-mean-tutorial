angular.module('app').controller('mvCourseDetailController', function ($scope, mvCourse, $routeParams) {
	$scope.course = mvCourse.get({_id: $routeParams.id});
});