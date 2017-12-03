angular.module('adminMainController', ['ckeditor']).controller('AdminMainController', function ($http, $scope, $rootScope, $cookieStore, Upload, $window, NgTableParams, AdminMain) {
    
    var user = $cookieStore.get('user') || null;
    
    $rootScope.base_url = document.location.origin;
    $scope.courses = {};
    $rootScope.logout = function () {
        $cookieStore.remove('user');
        $window.location.href = '/sakai/login';
    }
    
    if (user == null) {
        $window.location.href = '/sakai/login';
    }
    else {
        $rootScope.full_name = user.full_name;
        $rootScope.role = user.role;
       
        AdminMain.getCourses(user).then(function(data) {
            $scope.courses = data;
        })
    }

    $scope.setCid = function (id) {
        var current_course_class = $cookieStore.get('cid');

        if (current_course_class != null && current_course_class == id) {
            $cookieStore.remove('announcement_id');
        } 
        $cookieStore.remove('cdata');
        $cookieStore.put('cdata', {'cid': id, 'announcement_id': null, 'assignment_id': null, 'discussion_id': null});
    }
});
