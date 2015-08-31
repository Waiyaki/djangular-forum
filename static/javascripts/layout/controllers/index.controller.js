(function(){
    'use strict';

    angular.module('forum.layout.controllers')
        .controller('IndexController', ['Forum', '$location', function(Forum, $location){

            // moved this into a forums directive.

            /*var vm = this;

            vm.forums = [];
            vm.forums_loaded = false; // show loading bar.

            vm.navigate = function(slug){
                $location.path('/forums/' + slug + '/')
            }

            Forum.all().then(function(success){
                vm.forums = success.data;
                vm.forums_loaded = true;
            }, function(error){
                $mdToast.showSimple('Error loading forums. Please try again later.');
                vm.forums_loaded = true; // Remove the loading bar if an error occured.
            });*/
        }]);
})();
