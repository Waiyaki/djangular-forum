(function(){
    'use strict';

    angular.module('forum.authentication.controllers')
        .controller('LoginController', ['Authentication', '$location', function(Authentication, $location){
            var vm = this;

            vm.login = function(){
                Authentication.login(vm.user);
            }

            function activate(){
                if(Authentication.isAuthenticated()){
                    // An authenticated user has no business here.
                    $location.path('/').replace();
                }
            }

            activate();
        }]);
})();
