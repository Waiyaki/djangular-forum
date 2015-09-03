(function(){
    'use strict';

    angular.module('forum.comments.directives')
        .directive('newComment', ['$rootScope', '$mdToast', 'Comment', function($rootScope, $mdToast, Comment){
            return {
                restrict: 'E',
                scope: {
                    post: '='
                },
                link: function(scope, element, attrs, ctrl, transclude){
                    scope.showComment = function(){
                        element.find('md-content').toggleClass('hidden');
                    }
                    scope.submit = function(comment){
                        comment.post_pk = scope.post.id;
                        Comment.create(comment).then(function(success){
                            $rootScope.$broadcast('comment.created', success.data);
                            $mdToast.showSimple('Success! Comment created.');
                            scope.post.num_comments += 1;
                            scope.post.comments.push(success.data);
                            scope.comment = {};
                            scope.showComment();
                        }, function(error){
                            $mdToast.showSimple('Error creating comment. Please try again.');
                            $rootScope.$broadcast('comment.created.error');
                        });
                    }
                },
                templateUrl: '/static/templates/comments/new-comment.html'
            }
        }]);
})();
