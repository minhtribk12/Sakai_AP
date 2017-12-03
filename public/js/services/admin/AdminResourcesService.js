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
		}

		addResources: function(resource, user) {
			var param = {resource: resource, user:user};
			return $http.put('/api/admin/resource/new', param).then(function (result) {
				return result.data;
			})
		}
	};

}]);