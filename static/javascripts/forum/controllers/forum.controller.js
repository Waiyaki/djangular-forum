(function(){
    'use strict';

    angular.module('forum.forums.controllers')
        .controller('ForumController', ['Forum', '$routeParams', '$mdToast', function(
                Forum, $routeParams, $mdToast){

            var vm = this;
            vm.forum = undefined;

            vm.forumSlug = $routeParams.forum_slug;
            function activate(){
                Forum.get(vm.forumSlug).then(function(success){
                    vm.forum = success.data;
                }, function(error){
                    $mdToast.showSimple('Unable to load forum');
                    $location.path('/');
                });

            }

            activate();
        }]);
})();
