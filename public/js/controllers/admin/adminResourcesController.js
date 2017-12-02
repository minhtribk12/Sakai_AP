angular.module('adminResourcesController', []).controller('AdminResourcesController', function($scope, $rootScope, $route, md5, $window, $cookieStore, AdminResources) {

	var cdata = $cookieStore.get('cdata') || {'cid': null, 'announcement_id': null, 'assignment_id': null, 'discussion_id': null};

	AdminResources.getResources(cdata.cid, user).then(function(data){
    $scope.editting = "";

    AdminResources.getResources(cid, user).then(function(data) {

        $scope.files = data;
    });

    $scope.editResource = function(id) {
        if ($scope.editting != "") {
            return;
        }
        $scope.editting = id;
    }

    $scope.updateResource = function(file) {
        AdminResources.updateResources(file, user).then(function(data) {
            if (data) {
                $scope.editting = "";
            } else {
                alert('Update failed');
            }
        })
    }

    $scope.deleteRes = function(id) {
        if (confirm('Are you sure ? ')) {
            AdminResources.deleteResources(id, user).then(function(data) {
                if (data) {
                    $scope.editting = "";
                } else {
                    alert('delete Failed');
                }
            })
        }
    }

    $scope.loadedfile = function(){
        var data = new FormData();
        jQuery.each(jQuery('#myimage')[0].files, function(i, file) {
            data.append('file-'+i, file);
        });

        jQuery.ajax({
            url: '/fastFileUpload',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function(data){
                alert("OK");
            }
        });
    }



});