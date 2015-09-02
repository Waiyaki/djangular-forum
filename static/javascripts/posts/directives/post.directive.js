(function(){
    'use strict';

    angular.module('forum.posts.directives')
        .directive('post', [function(){
            return {
                restrict: 'E',
                scope: {
                    post: '='
                },
                templateUrl: '/static/templates/posts/post.html'
            }
        }])
})();
