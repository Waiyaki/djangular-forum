(function(){
    'use strict';

    angular.module('forum.forums.controllers')
        .controller('ForumController', [
            'Forum', 'Thread', 'Authentication', '$routeParams', '$mdToast', '$location', '$mdDialog', '$rootScope', function(
                Forum, Thread, Authentication, $routeParams, $mdToast, $location, $mdDialog, $rootScope){

            var vm = this;
            vm.forum = undefined;
            vm.isAuthenticated = Authentication.isAuthenticated();
            vm.forumSlug = $routeParams.forum_slug;
            vm.showCreate = function(event){
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: '/static/templates/thread/create-thread.html',
                    parent: angular.element(document.body),
                    targetEvent: event,
                    clickOutsideToClose: false
                }).then(function(thread){
                    submit(thread);
                });
            }

            function submit(thread) {
                thread.forum_slug = vm.forumSlug;

                // Actual update.
                Thread.create(thread).then(function(success){
                    // add a thread on the UI.
                    vm.forum.num_threads += 1;
                    $rootScope.$broadcast('thread.created');
                    $mdToast.showSimple('Success! Thread ' + thread.title + ' created.');
                }, function(error){
                    $mdToast.showSimple('Error creating thread "' + thread.title + '"');
                });
            }

            function DialogController($scope, $mdDialog){
                $scope.cancel = function(){
                    $mdDialog.cancel();
                };

                $scope.hide = function(){
                    $mdDialog.hide();
                }

                $scope.submit = function(thread){
                    $mdDialog.hide(thread);
                }
            }

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
