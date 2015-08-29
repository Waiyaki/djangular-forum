(function(){
    'use strict';

    angular.module('forum.thread.controllers')
        .controller('ThreadController', ['$routeParams', '$mdToast', 'Thread', function(
                $routeParams, $mdToast, Thread){
            var vm = this;

            vm.thread = undefined;
            vm.posts = [];

            function activate(){
                var slug = $routeParams.thread_slug;
                Thread.get(slug).then(function(success){
                    vm.thread = success.data;

                    // Get posts in this thread.
                    Thread.posts(slug).then(function(success){
                        vm.posts = success.data;
                    }, function(error){
                        $mdToast.showSimple('Unable to fetch posts.');
                    })
                }, function(error){
                    $mdToast.showSimple('Error loading thread: ', error.data);
                });

            }

            activate();
        }]);
})();
