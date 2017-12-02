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
            console.log(data)
        })
    }

    $scope.setCid = function (id) {
        $cookieStore.remove('cid');
        $cookieStore.put('cid', id);
    }
});
