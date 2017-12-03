angular.module('AdminGradeBookService', []).factory('AdminGradeBook', ['$http', function($http) {

	return {
		getGradebook: function(cid, user) {
			return $http.post('/api/admin/gradebook', {cid: cid, user: user}).then(function (result) {
				return result.data;
			})
		}
	};

}]);