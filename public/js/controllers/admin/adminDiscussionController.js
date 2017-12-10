angular.module('adminDiscussionController', []).controller('AdminDiscussionController', function($scope,$rootScope, $route,md5, $window,$cookieStore, AdminDiscussion) {

	var user = $cookieStore.get('user') || null;
	var cdata = $cookieStore.get('cdata') || { 'cid': null, 'announcement_id': null, 'assignment_id': null, 'discussion_id': null, 'gradebook_item_id': null, 'menu_index': null, 'course_name': null, 'is_teacher': false};
    $scope.course_name = cdata.course_name;

	AdminDiscussion.getDiscussion(cdata.cid, user).then(function(data){
		$scope.discussions = data;
		getDiscussionDetail();
	})

    $scope.reading = '';

	function getDiscussionDetail() {
		cdata = $cookieStore.get('cdata');
		AdminDiscussion.getDiscussionDetail(cdata.discussion_id).then(function(data){
			$scope.messages = data;
		})
	}

	$scope.setDiscussionId = function (id, topic) {
        $scope.reading = id;
        $cookieStore.put('cdata', {'cid': cdata.cid, 'announcement_id': id, 'assignment_id': cdata.assignment_id, 'discussion_id': id, 'gradebook_item_id': cdata.gradebook_item_id, 'menu_index': cdata.menu_index, 'course_name': cdata.course_name, 'is_teacher': cdata.is_teacher});
		getDiscussionDetail();
    }

    $scope.addDiscussion = function(file) {
        file.COURSE_CLASS_ID = cdata.cid;
        AdminDiscussion.addDiscussion(file, user).then(function(data) {
        	if (data) {
                alert('Created successfully!');
            } else {
                alert('Failed to create the discussion!');
            }
        })
    }

    $scope.addComment = function(file) {
        file.COURSE_CLASS_ID = cdata.cid;
        AdminDiscussion.addComment(file, user).then(function(data) {
        	if (data) {
                alert('Created successfully!');
            } else {
                alert('Failed to create a comment!');
            }
        })
    }

});