angular.module('appAdminRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
    .when('/sakai', {
            templateUrl: 'views/partials/admin/home.html',
            controller: 'AdminMainController'
        })
    .when('/sakai/login', {
            templateUrl: 'views/partials/admin/login.html',
            controller: 'AdminLoginController'
        })

    .when('/sakai/resource', {
            templateUrl: 'views/partials/admin/resource.html',
            controller: 'AdminResourcesController'
        })
    .when('/sakai/gradebook', {
            templateUrl: 'views/partials/admin/gradebook.html',
            controller: 'AdminGradeBookController'
        })
    .when('/sakai/assignment', {
            templateUrl: 'views/partials/admin/assignment.html',
            controller: 'AdminAssignmentController'
        })
    .when('/sakai/discussion', {
            templateUrl: 'views/partials/admin/discussion.html',
            controller: 'AdminDiscussionController'
        })
    .when('/sakai/announcement', {
            templateUrl: 'views/partials/admin/announcement.html',
            controller: 'AdminAnnouncementController'
        })
    .when('/sakai/announcement/detail', {
            templateUrl: 'views/partials/admin/announcement.html',
            controller: 'AdminAnnouncementController'
        }) 
    .when('/404', {
            templateUrl: '/views/404.html',
            title: '404 - Không tìm thấy trang yêu cầu',
            menu: 0
        });
        
        $locationProvider.html5Mode(true);
  
    }]);
