angular.module('AdminAnnouncementService', []).factory('AdminAnnouncement', ['$http', function($http) {

    return {
        getAnnouncement: function(cid, user) {
            var param = { cid: cid, user };
            return $http.post('/api/admin/announcement', param).then(function(result) {
                return result.data;
            })
        },
        getAnnouncementDetail: function(announcement_id) {
            var param = { announcement_id: announcement_id };
            return $http.post('/api/admin/announcement/detail', param).then(function(result) {
                return result.data;
            })
        },

        getAnnouncementAttachments: function(announcement_id) {
            var param = { announcement_id: announcement_id };
            return $http.post('/api/admin/announcement/attachment', param).then(function(result) {
                return result.data;
            })
        },

        updateAnnouncement: function(fileUpdated, data) {
            var param = { fileUpdated: fileUpdated, user: data };
            return $http.put('/api/admin/announcement/update', param).then(function(result) {
                return result.data;
            })
        },

        deleteAnnouncement: function(announcement_id) {
            var param = { announcement_id: announcement_id };
            return $http.post('/api/admin/announcement/delete', param).then(function(result) {
                return result.data;
            })
        },

        isTeacher: function(user_id, course_id) {
            return $http.post('/api/admin/courses/teacher', { user_id: user_id, course_id: course_id }).then(function(result) {
                if (result.data != null && result.data.length > 0) {
                    return true
                }
                return false;
            })
        }
    };

}]);