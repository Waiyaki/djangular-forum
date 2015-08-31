(function(){
    'use strict';

    angular.module('forum.interceptors')
        .factory('ForumInterceptor', ['$q', '$location', function($q, $location){
            return {
                responseError: function(rejection){
                    if(rejection.status == 404){
                        $location.path('/404').replace();
                        return $q.resolve();
                    }
                    else if(rejection.status == 403) {
                        $location.path('/login');
                        return $q.resolve();
                    }
                    $q.reject(rejection);
                }
            };
        }]);
})();
