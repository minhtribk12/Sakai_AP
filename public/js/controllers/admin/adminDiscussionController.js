angular.module('adminDiscussionController', []).controller('AdminDiscussionController', function($scope,$rootScope, $route,md5, $window,$cookieStore, AdminDiscussion) {

	var user = $cookieStore.get('user') || null;
	var cdata = $cookieStore.get('cdata') || {'cid': null, 'announcement_id': null, 'assignment_id': null, 'discussion_id': null};

	AdminDiscussion.getDiscussion(cdata.cid, user).then(function(data){
		$scope.discussions = data;
		getDiscussionDetail();
	})

	function getDiscussionDetail() {
		cdata = $cookieStore.get('cdata');
		AdminDiscussion.getDiscussionDetail(cdata.discussion_id).then(function(data){
			$scope.messages = data;
		})
	}

	$scope.setDiscussionId = function (id) {
		$cookieStore.put('cdata', {'cid': cdata.cid, 'announcement_id': cdata.announcement_id, 'assignment_id': cdata.assignment_id, 'discussion_id': id});
		getDiscussionDetail();
    }

});