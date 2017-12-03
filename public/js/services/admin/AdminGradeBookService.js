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
		}
	};

}]);