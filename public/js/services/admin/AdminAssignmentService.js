angular.module('AdminAssignmentService', []).factory('AdminAssignment', ['$http', function($http) {

	return {
		getAssignment: function (cid, user) {
			var param = {cid: cid, user};
			return $http.post('/api/admin/assignment', param).then(function (result) {
				return result.data;
			})
		},
		getAssignmentDetail: function (assignment_id) {
			var param = {assignment_id: assignment_id};
			return $http.post('/api/admin/assignment/detail', param).then(function (result) {
				return result.data;
			})
		},
		
		getAssignmentAttachments: function (assignment_id) {
			var param = {assignment_id: assignment_id};
			return $http.post('/api/admin/assignment/attachment', param).then(function (result) {
				return result.data;
			})
		}
	}; 

}]); 