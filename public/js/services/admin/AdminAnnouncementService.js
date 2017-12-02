angular.module('AdminAnnouncementService', []).factory('AdminAnnouncement', ['$http', function($http) {

	return {
		getAnnouncement: function (cid, user) {
			var param = {cid: cid, user};
			return $http.post('/api/admin/announcement', param).then(function (result) {
				return result.data;
			})
		}
	};

}]);