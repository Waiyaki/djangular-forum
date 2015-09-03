(function(){
    'use strict';

    angular.module('forum.authentication.services')
        .factory('Authentication', ['$window', '$cookies', '$http', '$q', '$mdToast',
                function($window, $cookies, $http, $q, $mdToast){
            var Authentication = {
                login: login,
                logout: logout,
                isAdmin: isAdmin,
                register: register,
                checkValidity: checkValidity,
                unauthenticate: unauthenticate,
                isAuthenticated: isAuthenticated,
                getAuthenticatedAccount: getAuthenticatedAccount,
                setAuthenticatedAccount: setAuthenticatedAccount
            };

            function login(user){
                return $http.post('/api/v1/rest-auth/login/', {
                    username: user.username,
                    password: user.password
                }).then(function(success){
                    // After log in, rest-auth gives back a token key.
                    var key = success.data;

                    // Ask it for a user representation instead, and cache that.
                    $http.get('/api/v1/rest-auth/user/').then(function(success){
                        Authentication.setAuthenticatedAccount(success.data);
                    }, function(error){
                        // If you encounter any errors, cache the token key instead.
                        Authentication.setAuthenticatedAccount(key);
                    });
                    $window.location.href = '/';
                }, function(error){
                    var msg;
                    if(error.data.message){
                        msg = "Error logging in: " + error.data.message;
                    }
                    else
                        msg = "Error logging in. Please check that username and password and try again.";
                    $mdToast.showSimple(msg);
                });
            }

            function register(user){
                return $http.post('/api/v1/rest-auth/registration/', {
                    username: user.username,
                    password1: user.password1,
                    password2: user.password2,
                    email: user.email
                }).then(function(success){
                    // Automatically login a user once the registration was successful.
                    var loginUser = {
                        username: user.username,
                        password: user.password1
                    }
                    Authentication.login(loginUser);
                }, function(error){
                    console.log(error.data);
                    var msg;
                    if(error.data.message){
                        msg = "Error logging in: " + error.data.message;
                    }
                    else
                        msg = "Error registering. Please try again.";
                    $mdToast.showSimple(msg);
                });
            }

            function checkValidity(username){
                return $http.get('/api/v1/users/' + username + '/check/').then(function(success){
                    // Have the api serve up 204 if the username is valid to 
                    // prevent the browser from logging too many 4** errors
                    // to the console.
                    if(success.status == 204){
                        return true;
                    }
                    // Username exists, reject this username
                    return $q.reject('exists');
                }, function(error){
                    // No idea why the api threw an error, so reject it.
                    return $q.reject(error);
                });
            }

            function isAdmin() {
                if(!Authentication.isAuthenticated()){
                    // if the user is  not authenticated, no need to even query the api.
                    var error = {
                        status: 403
                    }
                    return $q.reject(error);
                }
                return $http.get('/api/v1/users/is_admin/').then(function(success){
                    return $q.resolve(success);
                }, function(error){
                    console.log(error.status);
                    return $q.reject(error);
                });
            }

            function logout(){
                return $http.post('/api/v1/rest-auth/logout/').then(function(success){
                    Authentication.unauthenticate();
                    $window.location.href = '/';
                }, function(error){
                    // Unauthenticate anyway. Will force a login to access the
                    // pages that required login.
                    Authentication.unauthenticate();
                    $window.location.href = '/';
                    $mdToast.showSimple("Unknown error while logging out.");
                });
            }

            function unauthenticate(){
                $cookies.remove('authenticatedAccount');
            }

            function setAuthenticatedAccount(account){
                $cookies.put('authenticatedAccount', JSON.stringify(account));
            }

            function getAuthenticatedAccount(){
                if(!Authentication.isAuthenticated()){
                    return;
                }

                return JSON.parse($cookies.get('authenticatedAccount'));
            }

            function isAuthenticated(){
                return !!$cookies.get('authenticatedAccount');
            }

            return Authentication;
        }]);
})();
