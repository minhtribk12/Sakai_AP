angular.module('adminAnnouncementController', []).controller('AdminAnnouncementController', function($scope,$rootScope, $route,md5, $window,$cookieStore, AdminAnnouncement) {

	var user = $cookieStore.get('user') || null;
	var cdata = $cookieStore.get('cdata') || { 'cid': null, 'announcement_id': null, 'assignment_id': null, 'discussion_id': null, 'gradebook_item_id': null, 'menu_index': null, 'course_name': null, 'is_teacher': false};
    $scope.course_name = cdata.course_name;
    
    AdminAnnouncement.isTeacher(user.users_id, cdata.cid).then(function(res){
        $scope.isTeacher = res;
    })

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
        $scope.timeline = [];

        var tempObj = {};

        data.map(function(d) {
            var tDate = new Date(d.DATE_CREATED);
            var key = tDate.toLocaleDateString();
            if (!tempObj[key]) {
                tempObj[key] = [];
            }
            tempObj[key].push(d);
        })

        for (k in tempObj) {
            $scope.timeline.push({date: new Date(k), announcements: tempObj[k]});
        }

		getAnnouncementDetail();
	})

	$scope.setAnnouncementId = function (id) {
        $cookieStore.put('cdata', {'cid': cdata.cid, 'announcement_id': id, 'assignment_id': cdata.assignment_id, 'discussion_id': cdata.discussion_id, 'gradebook_item_id': cdata.gradebook_item_id, 'menu_index': cdata.menu_index, 'course_name': cdata.course_name, 'is_teacher': cdata.is_teacher});
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

    $scope.maxheight = window.innerHeight - 140 + "px";
});