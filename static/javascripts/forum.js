(function(){
    'use strict';

    angular.module('forum', [
        'ngMaterial',

        'forum.config',
        'forum.routes',

        'forum.authentication',

        'forum.layout'
    ])
    .run(['$http', function($http){
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
    }]);

    angular.module('forum.routes', ['ngRoute']);
    angular.module('forum.config', []);
})();
