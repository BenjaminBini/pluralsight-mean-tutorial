angular.module('app').controller('mvCourseListController', function($scope, mvCourse) {
	$scope.courses = mvCourse.query();

	$scope.sortOptions = [
	{
		value: "name",
		text: "Sort by title"
	},
	{
		value: "published",
		text: "Sort by publication date"	
	}]

	$scope.sortOrder = {
		selected: $scope.sortOptions[0].value
	}

});