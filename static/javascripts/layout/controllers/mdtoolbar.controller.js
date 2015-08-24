(function(){
    'use strict';

    angular.module('forum.layout.controllers')
        .controller('ToolbarController', ['$mdSidenav', '$location', 'Authentication',
                function($mdSidenav, $location, Authentication){
            var vm = this;

            vm.toggleSidenav = function(menuId){
                $mdSidenav(menuId).toggle();
            };

            vm.navigate = function(to){
                $location.url(to);
            };

            vm.logout = function(){
                Authentication.logout();
            }
        }]);
})();
