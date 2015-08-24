(function(){
    'use strict';

    angular.module('forum.authentication.controllers')
        .controller('RegisterController', ['Authentication', '$location', function(Authentication, $location){
            var vm = this;

            vm.register = function(){
                Authentication.register(vm.user);
            }

            function activate(){
                if(Authentication.isAuthenticated()){
                    // A logged in user has no business here.
                    $location.path('/').replace();
                }
            }

            vm.isvalid = function(){
                return vm.user.password1 === vm.user.password2;
            }
            activate();
        }]);
})();
