(function(){
    'use strict';

    angular.module('forum.config')
        .config(['$locationProvider', '$httpProvider', function($locationProvider, $httpProvider){
            $locationProvider.html5Mode(true).hashPrefix("!");

            $httpProvider.interceptors.push('ForumInterceptor');
        }]);
})();
