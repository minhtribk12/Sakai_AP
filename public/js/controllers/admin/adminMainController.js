angular.module('adminMainController', ['ckeditor']).controller('AdminMainController', function ($http, $scope, $rootScope, $cookieStore, Upload, $window, NgTableParams, AdminMain) {
    
    var user = $cookieStore.get('user') || null;
    
    $rootScope.base_url = document.location.origin;
    
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
       
    }
});
