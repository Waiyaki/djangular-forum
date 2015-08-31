(function(){
    'use strict';

    angular.module('forum.thread.controllers')
        .controller('ThreadController', ['$routeParams', '$mdToast', 'Thread', function(
                $routeParams, $mdToast, Thread){
            var vm = this;

            vm.thread = undefined;
            vm.threadSlug = $routeParams.thread_slug;
            function activate(){
                Thread.get(vm.threadSlug).then(function(success){
                    vm.thread = success.data;
                }, function(error){
                    $mdToast.showSimple('Error loading thread: ', error.data);
                });

            }

            activate();
        }]);
})();
