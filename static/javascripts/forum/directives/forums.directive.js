(function(){
    'use strict';

    angular.module('forum.forums.directives')
        .directive('forums', ['Forum', '$location', '$mdToast', function(Forum, $location, $mdToast){
            return {
                restrict: 'E',
                scope: {
                    forums: '='
                },
                link: function($scope, $element, $attrs) {
                    $scope.navigate = function(slug){
                        $location.path('/forums/' + slug + '/')
                    }

                    $scope.forums_loaded = false; // show loading bar.

                    Forum.all().then(function(success){
                        $scope.forums = success.data;
                        $scope.forums_loaded = true;
                    }, function(error){
                        $mdToast.showSimple('Unable to load forums. Please try again later.');
                        $scope.forums_loaded = true; // remove loading bar.
                    })
                },
                templateUrl: '/static/templates/forum/forums.html'
            }
        }])
})();

