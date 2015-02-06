angular.module('app').controller('mvMainController', function($scope, mvCourse) {
	$scope.courses = mvCourse.query();
});