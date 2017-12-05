angular.module('AdminMainService', []).factory('AdminMain', ['$http', function($http) {

	return {
		checkLogIn: function (data) {
			return $http.post('/api/admin/login', data).then(function (result) {
				return result.data;
			})
		},

		getCourses: function(data) {
			return $http.post('/api/admin/courses', data).then(function (result) {
				return result.data;
			})
		}, 

		isTeacher: function(user_id, course_id) {
			return $http.post('/api/admin/courses/teacher', {user_id: user_id, course_id: course_id}).then(function (result) {
				if (result.data != null && result.data.length > 0) {
					return true
				}
				return false;
			})
		}
	};

}]);