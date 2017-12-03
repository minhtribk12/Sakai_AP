angular.module('AdminDiscussionService', []).factory('AdminDiscussion', ['$http', function($http) {

	return {
		getDiscussion: function (cid, user) {
			var param = {cid: cid, user};
			return $http.post('/api/admin/discussion', param).then(function (result) {
				return result.data;
			})
		},
		getDiscussionDetail: function (discussion_id) {
			var param = {discussion_id: discussion_id};
			return $http.post('/api/admin/discussion/detail', param).then(function (result) {
				return result.data;
			})
		},
		addDiscussion: function(fileUpdated, data) {
			var param = {fileUpdated: fileUpdated, user:data};
			return $http.put('/api/admin/discussion/add', param).then(function (result) {
				return result.data;
			})
		},
		addMessage: function(fileUpdated, data) {
			var param = {fileUpdated: fileUpdated, user:data};
			return $http.put('/api/admin/discussion/message/add', param).then(function (result) {
				return result.data;
			})
		}
	};

}]);