(function(){
    'use strict';

    angular.module('forum', [
        'ngMaterial',

        'forum.config',
        'forum.routes',
        'forum.interceptors',

        'forum.authentication',

        'forum.layout',
        'forum.forums',
        'forum.thread',
        'forum.posts',
    ])
    .run(['$http', function($http){
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
    }]);

    angular.module('forum.routes', ['ngRoute']);
    angular.module('forum.config', []);
    angular.module('forum.interceptors', []);
})();
