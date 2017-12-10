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
		},

		getSubmissions: function (assignment_id, user_id) {
			var param = {assignment_id: assignment_id, user_id: user_id};
			return $http.post('/api/admin/assignment/submission', param).then(function (result) {
				return result.data;
			})
		},

		getSubmissionAttachments: function (assignment_id, user_id) {
			var param = {assignment_id: assignment_id, user_id: user_id};
			return $http.post('/api/admin/assignment/submission/attachment', param).then(function (result) {
				return result.data;
			})
		},

		updateAssignment: function(fileUpdated, data) {
			var param = {fileUpdated: fileUpdated, user:data};
			return $http.put('/api/admin/assignment/update', param).then(function (result) {
				return result.data;
			})
		},

		submissions: function(submit, data, assignment_id) {
			var param = {submit: submit, user:data, assignment_id: assignment_id};
			return $http.put('/api/admin/assignment/submission', param).then(function (result) {
				return result.data;
			})
		},
		getsubmitList: function(assignment) {
			var param = {assignment: assignment};
			return $http.post('/api/admin/assignment/listsubmission', param).then(function (result) {
				return result.data;
			})
		},

		isTeacher: function(user_id, course_id) {
			return $http.post('/api/admin/courses/teacher', {user_id: user_id, course_id: course_id}).then(function (result) {
				if (result.data != null && result.data.length > 0) {
					return true
				}
				return false;
			})
		}
	}; 

}]); 