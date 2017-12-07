angular.module('AdminGradeBookService', []).factory('AdminGradeBook', ['$http', function($http) {

	return {
		getGradebook: function(cid, user) {
			return $http.post('/api/admin/gradebook', {cid: cid, user: user}).then(function (result) {
				return result.data;
			})
		},

		summitPoint: function(user, cdata, listpoint) {
			return $http.put('/api/admin/gradebook', {cdata: cdata, user: user, listpoint: listpoint}).then(function (result) {
				return result.data;
			})
		},
		getGradebookItems: function(cid) {
			return $http.post('/api/admin/gradebook/item', {cid: cid}).then(function (result) {
				return result.data;
			})
		},
		getGradebookItemDetail: function(gradebook_item_id, cid) {
			return $http.post('/api/admin/gradebook/item/detail', {gradebook_item_id: gradebook_item_id, cid: cid}).then(function (result) {
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