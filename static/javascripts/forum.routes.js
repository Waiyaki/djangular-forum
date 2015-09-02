(function(){
    'use strict';

    angular.module('forum.routes')
        .config(['$routeProvider', function($routeProvider){
            $routeProvider.when('/login', {
                controller: 'LoginController',
                controllerAs: 'vm',
                templateUrl: '/static/templates/authentication/login.html'
            })
            .when('/register', {
                controller: 'RegisterController',
                controllerAs: 'vm',
                templateUrl: '/static/templates/authentication/register.html'
            })
            .when('/', {
                controller: 'IndexController',
                controllerAs: 'vm',
                templateUrl: '/static/templates/layout/index.html'
            })
            .when('/forums/:forum_slug', {
                controller: 'ForumController',
                controllerAs: 'vm',
                templateUrl: '/static/templates/forum/forum.html'
            })
            .when('/threads/:thread_slug', {
                controller: 'ThreadController',
                controllerAs: 'vm',
                templateUrl: '/static/templates/thread/thread.html'
            })
            .when('/create/forum', {
                controller: 'NewForumController',
                controllerAs: 'vm',
                templateUrl: '/static/templates/forum/create-forum.html',
                resolve: {
                    auth: ['$q', '$location', 'Authentication',
                        function($q, $location, Authentication){
                            return Authentication.isAdmin().then(function(success){},
                                function(error){
                                    $location.path('/403').replace();
                                    return $q.reject(error);
                                });
                        }]
                }
            })
            .when('/404', {
                templateUrl: '/static/templates/404.html'
            })
            .when('/403', {
                templateUrl: '/static/templates/403.html'
            })
            .otherwise('/');
        }]);
})();
