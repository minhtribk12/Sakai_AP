angular.module('AdminGradeBookService', []).factory('AdminGradeBook', ['$http', function($http) {

	return {
		getGradebook: function(cid, data) {
			return $http.post('/api/admin/gradebook', {cid: cid, user:data}).then(function (result) {
				return result.data;
			})
		}
	};

}]);