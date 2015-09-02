(function(){
    'use strict';

    angular.module('forum.layout.controllers')
        .controller('SidenavController', ['$location', function($location){
            var vm = this;

            vm.navigate = function(to){
                $location.path(to);
            };
        }]);
})();
