angular.module('adminResourcesController', []).controller('AdminResourcesController', function($scope, $rootScope, $route, md5, $window, $cookieStore, AdminResources) {

    var user = $cookieStore.get('user') || null;
    var cdata = $cookieStore.get('cdata') || { 'cid': null, 'announcement_id': null, 'assignment_id': null, 'discussion_id': null, 'gradebook_item_id': null, 'menu_index': null, 'course_name': null, 'is_teacher': false};
    $scope.course_name = cdata.course_name;

    AdminResources.isTeacher(user.users_id, cdata.cid).then(function(res){
        $scope.isTeacher = res;
    })

    loadData();

    $scope.editResource = function(id) {
        if ($scope.editting != "") {
            return;
        }
        $scope.editting = id;
    }

    $scope.updateResource = function(file) {
        file.COURSE_CLASS_ID = cdata.cid;
        AdminResources.updateResources(file, user).then(function(data) {
            if (file.RESOURCES_ID != null) {
                if (data) {
                    $scope.editting = "";
                } else {
                    alert('Update failed');
                }
            } else {
                if (data) {
                    alert('Created successfully!');
                } else {
                    alert('Failed to create the resource!');
                }
            }
            loadData();
        })
    }
    
    $scope.deleteResource = function(id) {
        if (confirm('Are you sure ? ')) {
            AdminResources.deleteResources(id, user).then(function(data) {
                if (data) {
                    loadData();
                } else {
                    alert('delete Failed');
                }
            })
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
                $scope.resource.AttNAME = data.originalname;
                $scope.resource.ATTACHMENT_ID = data.insertId;
                $('#myfile').val(null);
                $('#AttNAME').val(data.originalname);
                 $scope.$apply();
            }
        });
    }

    function loadData() {
        // Reload data
        AdminResources.getResources(cdata.cid, user).then(function(data) {
            $scope.files = data;
            $scope.editting = "";
        });
    }

    $scope.valid = function() {
        return $scope.resource != undefined 
                && $scope.resource.ATTACHMENT_ID != undefined && $scope.resource.ATTACHMENT_ID != ''
                && $scope.resource.NAME != undefined && $scope.resource.NAME != ''
    }
});