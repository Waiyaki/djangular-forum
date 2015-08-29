(function(){
    'use strict';

    angular.module('forum.layout.controllers')
        .controller('IndexController', ['Forum', '$location', function(Forum, $location){
            var vm = this;

            vm.forums = [];

            vm.navigate = function(slug){
                $location.path('/forums/' + slug + '/')
            }

            Forum.all().then(function(success){
                vm.forums = success.data;
            }, function(error){
                $mdToast.showSimple('Error loading forums. Please try again later.');
            });
        }]);
})();
