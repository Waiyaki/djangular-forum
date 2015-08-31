(function(){
    'use strict';

    angular.module('forum.posts.directives')
        .directive('posts', ['Thread', '$mdToast', function(Thread, $mdToast){
            return {
                restrict: 'E',
                scope: {
                    threadSlug: '@'
                },
                link: function($scope, $element, $attrs){
                    $scope.posts_loaded = false;
                    Thread.posts($scope.threadSlug).then(function(success){
                        $scope.posts = success.data;
                        $scope.posts_loaded = true;
                    }, function(error){
                        $scope.posts_loaded = true;
                        $mdToast.showSimple('Unable to load posts for this thread.');
                    });
                },
                templateUrl: '/static/templates/posts/posts.html'
            };
        }]);
})();
