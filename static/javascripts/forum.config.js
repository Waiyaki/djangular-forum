(function(){
    'use strict';

    angular.module('forum.config')
        .config(['$locationProvider', function($locationProvider){
            $locationProvider.html5Mode(true).hashPrefix("!");
        }]);
})();
