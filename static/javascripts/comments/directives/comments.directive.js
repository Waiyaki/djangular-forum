(function(){
    'use strict';

    angular.module('forum.comments.directives')
        .directive('comments', [function(){
            return {
                restrict: 'E',
                scope: {
                    comments: '='
                },
                templateUrl: '/static/templates/comments/comments.html'
            }
        }]);
})();
