(function(){
    'use strict';

    angular.module('forum.posts.directives')
        .directive('post', ['Authentication', '$mdDialog', function(Authentication, $mdDialog){
            return {
                restrict: 'E',
                scope: {
                    post: '='
                },
                link: function(scope, element, attrs){
                    scope.isAuthenticated = Authentication.isAuthenticated();

                    scope.showPost = function($event){
                        $mdDialog.show({
                            controller: DialogController,
                            parent: angular.element(document.body),
                            clickOutsideToClose: false,
                            targetEvent: event,
                            templateUrl: '/static/templates/posts/full-post.html'
                        });
                    }

                    function DialogController($scope, $mdDialog){
                        $scope.cancel = function(){
                            $mdDialog.cancel();
                        }

                        $scope.hide = function(){
                            $mdDialog.hide();
                        }

                        $scope.post = scope.post;
                        $scope.isAuthenticated = scope.isAuthenticated;
                    }
                },
                templateUrl: '/static/templates/posts/post.html'
            }
        }])
})();
