angular.module('adminAnnouncementController', []).controller('AdminAnnouncementController', function($scope,$rootScope, $route,md5, $window,$cookieStore, AdminAnnouncement) {

	var user = $cookieStore.get('user') || null;
	var cdata = $cookieStore.get('cdata') || {'cid': null, 'announcement_id': null, 'assignment_id': null, 'discussion_id': null};

	function getAnnouncementDetail() {
		cdata = $cookieStore.get('cdata');
		AdminAnnouncement.getAnnouncementDetail(cdata.announcement_id).then(function(data){
			$scope.announcement_detail = data[0];
		})
		AdminAnnouncement.getAnnouncementAttachments(cdata.announcement_id).then(function(data){
			$scope.announcement_attachment = data;
		})
	}

	AdminAnnouncement.getAnnouncement(cdata.cid, user).then(function(data){
		$scope.announcements = data;
		getAnnouncementDetail();
	})

	$scope.setAnnouncementId = function (id) {
        $cookieStore.put('cdata', {'cid': id, 'announcement_id': id, 'assignment_id': cdata.assignment_id, 'discussion_id': cdata.discussion_id});
		getAnnouncementDetail();
    }

    $scope.updateAnnouncement = function(file) {
        file.COURSE_CLASS_ID = cdata.cid;
        AdminAnnouncement.updateAnnouncement(file, user).then(function(data) {
            if (file.ANNOUNCEMENT_ID != null) {
                if (!data) {
                   alert('Update failed');
                } 
            } else {
                if (data) {
                    alert('Created successfully!');
                } else {
                    alert('Failed to create the resource!');
                }
            }
        })
    }
});