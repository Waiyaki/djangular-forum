(function(){
    'use strict';

    angular.module('forum.thread.services')
        .factory('Thread', ['$http', function($http){
            var Thread = {
                get: get,
                all: all,
                create: create,
                update: update,
                posts: posts
            };

            function get(slug) {
                return $http.get('/api/v1/threads/' + slug + '/');
            }

            function all(){
                return $http.get('/api/v1/threads/');
            }

            function create(thread) {
                return $http.post('/api/v1/threads/', {
                    title: thread.title,
                    forum_slug: thread.forum_slug,
                    description: thread.description || null
                });
            }

            function update(thread){
                return $http.put('/api/v1/threads/', {
                    title: thread.title,
                    description: thread.description
                });
            }

            function posts(slug) {
                return $http.get('/api/v1/threads/' + slug + '/posts/');
            }

            return Thread;
        }]);
})();
