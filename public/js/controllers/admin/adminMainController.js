angular.module('adminMainController', ['ckeditor']).controller('AdminMainController', function($http, $scope, $rootScope, $cookieStore, Upload, $window, NgTableParams, AdminMain) {

    var user = $cookieStore.get('user') || null;
    var cdata = $cookieStore.get('cdata') || { 'cid': null, 'announcement_id': null, 'assignment_id': null, 'discussion_id': null, 'gradebook_item_id': null, 'menu_index': null, 'course_name': null, 'is_teacher': false};

    $rootScope.base_url = document.location.origin;
    $scope.courses = {};
    $rootScope.logout = function() {
        $cookieStore.remove('user');
        $window.location.href = '/sakai/login';
    }

    if (user == null) {
        $window.location.href = '/sakai/login';
    } else {
        $rootScope.full_name = user.full_name;
        $rootScope.role = user.role;

        if (cdata != undefined) {
            $scope.menu_index = cdata.menu_index;
            $scope.cid = cdata.cid;
            $scope.course_name = cdata.course_name;
        }

        AdminMain.getCourses(user).then(function(data) {
            $scope.courses = data;
        })
    }

    $scope.setCid = function(id, index, name) {
        var current_course_class = $cookieStore.get('cid');

        AdminMain.isTeacher(user.users_id, id).then(function(data) {
            $scope.menu_index = index;
            $scope.cid = id;
            $scope.name = name;
            $cookieStore.remove('cdata');
            $cookieStore.put('cdata', {'cid': id, 'announcement_id': null, 'assignment_id': null, 'discussion_id': null, 'gradebook_item_id': null, 'menu_index': cdata.menu_index, 'course_name': cdata.course_name, 'is_teacher': data});
        })    
    }
});