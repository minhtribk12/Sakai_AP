angular.module('AdminMainService', []).factory('AdminMain', ['$http', function($http) {

	return {
		checkLogIn: function (data) {
			return $http.post('/api/admin/login', data).then(function (result) {
				return result.data;
			})
		}

	};

}]);