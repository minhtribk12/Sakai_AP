angular.module('AdminAnnouncementService', []).factory('AdminAnnouncement', ['$http', function($http) {

	return {
		getAnnouncement: function (cid, user) {
			var param = {cid: cid, user};
			return $http.post('/api/admin/announcement', param).then(function (result) {
				return result.data;
			})
		},
		getAnnouncementDetail: function (announcement_id) {
			var param = {announcement_id: announcement_id};
			return $http.post('/api/admin/announcement/detail', param).then(function (result) {
				return result.data;
			})
		},
		
		getAnnouncementAttachments: function (announcement_id) {
			var param = {announcement_id: announcement_id};
			return $http.post('/api/admin/announcement/attachment', param).then(function (result) {
				return result.data;
			})
		},

		updateAnnouncement: function(fileUpdated, data) {
			var param = {fileUpdated: fileUpdated, user:data};
			return $http.put('/api/admin/announcement/update', param).then(function (result) {
				return result.data;
			})
		}
	};

}]);