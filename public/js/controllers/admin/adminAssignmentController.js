angular.module('adminAssignmentController', []).controller('AdminAssignmentController', function($scope,$rootScope, $route,md5, $window,$cookieStore, AdminAssignment) {

	var user = $cookieStore.get('user') || null;
	var cdata = $cookieStore.get('cdata') || {'cid': null, 'announcement_id': null, 'assignment_id': null, 'discussion_id': null};

	function getAssignmentDetail() {
		cdata = $cookieStore.get('cdata');
		AdminAssignment.getAssignmentDetail(cdata.assignment_id).then(function(data){
			$scope.assignment_detail = data[0];
		})
		AdminAssignment.getAssignmentAttachments(cdata.assignment_id).then(function(data){
			$scope.assignment_attachment = data;
		})
	}

	AdminAssignment.getAssignment(cdata.cid, user).then(function(data){
		$scope.assignments = data;
		getAssignmentDetail();
	})

	$scope.setAssignmentId = function (id) {
		$cookieStore.put('cdata', {'cid': id, 'announcement_id': cdata.announcement_id, 'assignment_id': id, 'discussion_id': cdata.discussion_id});
		getAssignmentDetail();
    }

});