(function(){
    'use strict';

    angular.module('forum.authentication.directives')
        .directive('validatePassword', function(){
            return {
                restrict: 'A',
                require: 'ngModel',
                scope: {
                    password1: '=validatePassword'
                },
                link: function(scope, element, attrs, ngModel){
                    ngModel.$validators.validatePassword = function(modelValue){

                        return modelValue == scope.password1;
                    };

                    scope.$watch('password1', function(){
                        ngModel.$validate();
                    });
                }
            }
        })
        .directive('validateUsername', ['$q', 'Authentication', function($q, Authentication){
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, element, attrs, ngModel){
                    ngModel.$asyncValidators.validateUsername = function(modelValue, viewValue){
                        var username = modelValue || viewValue;
                        var defer = $q.defer();
                        
                        Authentication.checkValidity(username).then(function(){
                            defer.resolve();
                        }, function(){
                            defer.reject();
                        });

                        return defer.promise;
                    };
                }
            };
        }]);
})();
