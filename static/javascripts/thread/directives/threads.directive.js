(function(){
    'use strict';

    angular.module('forum.thread.directives')
        .directive('threads', ['Forum', '$mdToast', '$rootScope', function(Forum, $mdToast, $rootScope){
            return {
                restrict: 'E',
                scope: {
                    forumSlug: '@'
                },
                link: function($scope, $element, $attrs){
                    $scope.threads_loaded = false; // show loading bar.

                    // Get threads in this forum.
                    function activate(){
                        Forum.threads($scope.forumSlug).then(function(success){
                            $scope.threads = success.data;
                            $scope.threads_loaded = true;
                        }, function(error){
                            $scope.threads_loaded = true;
                            $mdToast.showSimple('Unable to fetch threads for this forum.');
                        });
                    }
                    activate();

                    $scope.$on('thread.created', function(event){
                        $scope.threads_loaded = false;
                        activate();
                    });
                },
                templateUrl: '/static/templates/thread/threads.html'
            }
        }]);
})();
