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
                template: '<h1>In here</h1>'
            })
            .otherwise('/');
        }]);
})();
