angular.module('AdminResourcesService', []).factory('AdminResources', ['$http', function($http) {

	return {
		getResources: function(cid, data) {
			var param = {cid: cid, user:data};
			return $http.post('/api/admin/resource', param).then(function (result) {
				return result.data;
			})
		},

		updateResources: function(fileUpdated, data) {
			var param = {fileUpdated: fileUpdated, user:data};
			return $http.put('/api/admin/resource/update', param).then(function (result) {
				return result.data;
			})
		},

		deleteResources: function(resId, data) {
			var param = {resId: resId, user:data};
			return $http.post('/api/admin/resource/delete', param).then(function (result) {
				return result.data;
			})
		},

		addResources: function(resource, user) {
			var param = {resource: resource, user:user};
			return $http.put('/api/admin/resource/new', param).then(function (result) {
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