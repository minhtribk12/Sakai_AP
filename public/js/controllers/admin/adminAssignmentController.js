angular.module('adminAssignmentController', []).controller('AdminAssignmentController', function($scope, $rootScope, $route, md5, $window, $cookieStore, AdminAssignment) {

    var user = $cookieStore.get('user') || null;
    var cdata = $cookieStore.get('cdata') || { 'cid': null, 'announcement_id': null, 'assignment_id': null, 'discussion_id': null, 'gradebook_item_id': null };
    $scope.course_name = cdata.course_name;

    function getAssignmentDetail() {
        cdata = $cookieStore.get('cdata');
        AdminAssignment.getAssignmentDetail(cdata.assignment_id).then(function(data) {
            $scope.assignment_detail = data[0];
        })
        AdminAssignment.getAssignmentAttachments(cdata.assignment_id).then(function(data) {
            $scope.assignment_attachment = data;
        })
        AdminAssignment.getSubmissions(cdata.assignment_id, user.users_id).then(function(data) {
            $scope.submission = data[0];
        })

        AdminAssignment.getSubmissionAttachments(cdata.assignment_id, user.users_id).then(function(data) {
            $scope.submission_attachment = data;
        })
    }

    AdminAssignment.getAssignment(cdata.cid, user).then(function(data) {
        $scope.assignments = data;
        getAssignmentDetail();
    })

    $scope.setAssignmentId = function(id) {
        $cookieStore.put('cdata', { 'cid': cdata.cid, 'announcement_id': cdata.announcement_id, 'assignment_id': id, 'discussion_id': cdata.discussion_id, 'gradebook_item_id': cdata.gradebook_item_id });
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

            AdminAssignment.getAssignment(cdata.cid, user).then(function(data) {
                $scope.assignments = data;
                getAssignmentDetail();
            })
        })
    }

    $scope.editAssignment = function(assignment, attachfiles) {
    	getAssignmentDetail();
        $scope.assignment = assignment;
        $scope.assignment.resources = [];
        for (var i = attachfiles.length - 1; i >= 0; i--) {
            $scope.assignment.resources.push({AttNAME: attachfiles[i].NAME, DESCRIPTION: attachfiles[i].ATTACHMENT_DESCRIPTION, ATTACHMENT_ID: attachfiles[i].ATTACHMENT_ID });
        }
    }

    $scope.initNewAssignment = function() {
        $scope.assignment = {};
        $scope.assignment.resources = [];
    }

    $scope.deleteAtt = function(index) {
        if ($scope.assignment.resources && $scope.assignment.resources.length > index) {
            $scope.assignment.resources.splice(index, 1);
        }
    }

    $scope.loadedfile = function() {
        var data = new FormData();
        jQuery.each(jQuery('#myfile')[0].files, function(i, file) {
            data.append('file-' + i, file);
        });

        jQuery.ajax({
            url: '/fastFileUpload',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function(data) {
                $scope.assignment.resources.push({ AttNAME: data.originalname, ATTACHMENT_ID: data.insertId });
                $('#myfile').val(null);
                $scope.$apply();
            }
        });
    }
});