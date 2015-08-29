(function(){
    'use strict';

    angular.module('forum.thread.controllers')
        .controller('ThreadController', ['$routeParams', '$mdToast', 'Thread', function(
                $routeParams, $mdToast, Thread){
            var vm = this;

            vm.thread = undefined;
            vm.posts = [];
            vm.posts_loaded = false; // show loading bar.
            function activate(){
                var slug = $routeParams.thread_slug;
                Thread.get(slug).then(function(success){
                    vm.thread = success.data;

                    // Get posts in this thread.
                    Thread.posts(slug).then(function(success){
                        vm.posts = success.data;
                        vm.posts_loaded = true;
                    }, function(error){
                        $mdToast.showSimple('Unable to fetch posts.');
                        vm.posts_loaded = true;
                    });
                }, function(error){
                    $mdToast.showSimple('Error loading thread: ', error.data);
                });

            }

            activate();
        }]);
})();
