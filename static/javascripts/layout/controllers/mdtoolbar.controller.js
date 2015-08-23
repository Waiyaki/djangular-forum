(function(){
    'use strict';

    angular.module('forum.layout.controllers')
        .controller('ToolbarController', ['$mdSidenav', '$location', function($mdSidenav, $location){
            var vm = this;

            vm.toggleSidenav = function(menuId){
                $mdSidenav(menuId).toggle();
            };

            vm.navigate = function(to){
                console.log('Imagine navigation to ', to);
                $location.url(to);
            };
        }]);
})();
