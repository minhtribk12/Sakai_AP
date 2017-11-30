angular.module('AdminResourcesService', []).factory('AdminResources', ['$http', function($http) {

	return {
		getResources: function(cid, data) {
			return $http.post('/api/admin/resource', {cid: cid, user:data}).then(function (result) {
				return result.data;
			})
		}
	};

}]);