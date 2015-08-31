(function(){
    'use strict';

    angular.module('forum.thread.directives')
        .directive('threads', ['Forum', '$mdToast', function(Forum, $mdToast){
            return {
                restrict: 'E',
                scope: {
                    forumSlug: '@'
                },
                link: function($scope, $element, $attrs){
                    $scope.threads_loaded = false; // show loading bar.

                    // Get threads in this forum.
                    Forum.threads($scope.forumSlug).then(function(success){
                        $scope.threads = success.data;
                        $scope.threads_loaded = true;
                    }, function(error){
                        $scope.threads_loaded = true;
                        $mdToast.showSimple('Unable to fetch threads for this forum.');
                    });
                },
                templateUrl: '/static/templates/thread/threads.html'
            }
        }])
})();
