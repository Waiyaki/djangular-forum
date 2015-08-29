(function(){
    'use strict';

    angular.module('forum.forums.controllers')
        .controller('ForumController', ['Forum', '$routeParams', '$mdToast', '$location', function(
                Forum, $routeParams, $mdToast, $location){

            var vm = this;

            vm.threads = [];
            vm.forum = undefined;

            vm.navigate = function(slug) {
                var url = '/threads/' + slug;
                console.log('Imagine navigating to ', url);
            }

            function activate(){
                var slug = $routeParams.forum_slug;
                Forum.get(slug).then(function(success){
                    vm.forum = success.data;
                }, function(error){
                    $mdToast.showSimple('Unable to load forum');
                    $location.path('/');
                });

                Forum.threads(slug).then(function(success){
                    vm.threads = success.data;
                }, function(error){
                    $mdToast.showSimple('Unable to load threads.');
                });
            }

            activate();
        }]);
})();
