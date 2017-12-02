angular.module('adminLoginController', []).controller('AdminLoginController', function($scope,$rootScope, $route,md5, $window,$cookieStore, AdminMain) {

	var user = $cookieStore.get('user') || null;

	$scope.user = {};

	if(user != null){
		$window.location.href = '/sakai';
	}else{
		$scope.login = function () {
			
			$scope.user.passwd = md5.createHash($scope.user.passwd);
			
			AdminMain.checkLogIn($scope.user).then(function (data) {
				if(data.length > 0){
					$cookieStore.user = [];
					$cookieStore.put('user', data[0]);
					
					$window.location.href = '/sakai';
				}else{
					$scope.user.passwd = '';
					alert('Sai tên đăng nhập hoặc mật khẩu !');
				}
			})
		}
	}


});