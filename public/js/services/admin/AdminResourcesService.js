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
			return $http.put('/api/admin/resource', param).then(function (result) {
				return result.data;
			})
		},

		deleteResources: function(resId, data) {
			var param = {resId: resId, user:data};
			return $http.delete('/api/admin/resource', param).then(function (result) {
				return result.data;
			})
		},
	};

}]);