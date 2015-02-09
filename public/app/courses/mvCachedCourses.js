angular.module('app').factory('mvCachedCourses', function(mvCourse, $q) {
	var courseList;

	return {
		query: function() {
			if (!courseList) {
				courseList = mvCourse.query();
			}

			return courseList;
		}
	};
});