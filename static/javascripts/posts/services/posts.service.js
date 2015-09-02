(function(){
    'use strict';

    angular.module('forum.posts.services')
        .factory('Posts', ['$http', function($http){
            var Posts = {
                get: get,
                create: create,
                update: update,
                delete: delete_post
            };

            function create(post){
                return $http.post('/api/v1/posts/', {
                    title: post.title,
                    body: post.body,
                    thread_slug: post.thread_slug
                });
            }

            function get(id){
                return $http.get('/api/v1/posts/' + id + '/');
            }

            function update(id, post){
                return $http.put('/api/v1/posts/' + id + '/', {
                    title: post.title,
                    content: post.body,
                    thread_slug: post.thread_slug
                });
            }

            function delete_post(id){
                return $http.delete('/api/v1/posts/' + id + '/');
            }

            return Posts;
        }]);
})();
