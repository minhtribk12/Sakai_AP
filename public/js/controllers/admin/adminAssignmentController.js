angular.module('adminAssignmentController', []).controller('AdminAssignmentController', function($scope,$rootScope, $route,md5, $window,$cookieStore, AdminAssignment) {

	var user = $cookieStore.get('user') || null;
	var cdata = $cookieStore.get('cdata') || { 'cid': null, 'announcement_id': null, 'assignment_id': null, 'discussion_id': null, 'gradebook_item_id': null};

	function getAssignmentDetail() {
		cdata = $cookieStore.get('cdata');
		AdminAssignment.getAssignmentDetail(cdata.assignment_id).then(function(data){
			$scope.assignment_detail = data[0];
		})
		AdminAssignment.getAssignmentAttachments(cdata.assignment_id).then(function(data){
			$scope.assignment_attachment = data;
		})
		AdminAssignment.getSubmissions(cdata.assignment_id, user.users_id).then(function(data){
			$scope.submission = data[0];
		})

		AdminAssignment.getSubmissionAttachments(cdata.assignment_id, user.users_id).then(function(data){
			$scope.submission_attachment = data;
		})
	}

	AdminAssignment.getAssignment(cdata.cid, user).then(function(data){
		$scope.assignments = data;
		getAssignmentDetail();
	})

	$scope.setAssignmentId = function (id) {
		$cookieStore.put('cdata', {'cid': cdata.cid, 'announcement_id': cdata.announcement_id, 'assignment_id': id, 'discussion_id': cdata.discussion_id, 'gradebook_item_id': cdata.gradebook_item_id});
		getAssignmentDetail();
    }

    $scope.updateAssignment = function(file) {
        file.COURSE_CLASS_ID = cdata.cid;
        AdminAssignment.updateAssignment(file, user).then(function(data) {
            if (file.ASSIGNMENT_ID != null) {
                if (!data) {
                   alert('Update failed');
                } 
            } else {
                if (data) {
                    alert('Created successfully!');
                } else {
                    alert('Failed to create the assignment!');
                }
            }
        })
    }

});