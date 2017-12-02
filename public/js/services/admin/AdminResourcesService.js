angular.module('AdminResourcesService', []).factory('AdminResources', ['$http', function($http) {

	return {
		getResources: function(cid, data) {
			var param = {cid: cid, user:data};
			return $http.post('/api/admin/resource', param).then(function (result) {
				return result.data;
			})
		}
	};

}]);