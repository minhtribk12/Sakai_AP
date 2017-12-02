angular.module('adminAnnouncementController', []).controller('AdminAnnouncementController', function($scope,$rootScope, $route,md5, $window,$cookieStore, AdminAnnouncement) {

	var user = $cookieStore.get('user') || null;
		
	AdminAnnouncement.getAnnouncement(user, $rootScope.cid).then(function(data){
		$scope.announcement = data;
	})
});