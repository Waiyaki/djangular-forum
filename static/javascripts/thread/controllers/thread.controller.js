(function(){
    'use strict';

    angular.module('forum.thread.controllers')
        .controller('ThreadController', [
            '$rootScope', '$routeParams', '$mdToast', '$mdDialog', 'Thread', 'Posts', 'Authentication', function(
                $rootScope, $routeParams, $mdToast, $mdDialog, Thread, Posts, Authentication){
            var vm = this;

            vm.thread = undefined;
            vm.threadSlug = $routeParams.thread_slug;
            vm.isAuthenticated = Authentication.isAuthenticated();

            vm.showCreate = function(event){
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: '/static/templates/posts/create-post.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: false,
                    targetEvent: event
                })
                .then(function(post){
                    submit(post);
                });
            }

            function submit(post){
                post.thread_slug = vm.threadSlug;

                Posts.create(post).then(function(success){
                    $rootScope.$broadcast('post.created', {
                        post: success.data
                    });
                    vm.thread.num_posts += 1;
                    $mdToast.showSimple('Success! Post Created.');
                }, function(error){
                    $mdToast.showSimple('Error while creating post. Please try again.');
                });
            }

            function DialogController($scope, $mdDialog){
                $scope.cancel = function(){
                    $mdDialog.cancel();
                }

                $scope.hide = function(){
                    $mdDialog.hide();
                }

                $scope.submit = function(post){
                    $mdDialog.hide(post);
                }
            }

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
