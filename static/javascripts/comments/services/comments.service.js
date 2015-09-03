(function(){
    'use strict';

    angular.module('forum.comments.services')
        .factory('Comment', ['$http', function($http){
            var Comment = {
                create: create,
                update: update,
                delete: delete_comment
            };

            function create(comment){
                return $http.post('/api/v1/comments/', {
                    body: comment.body,
                    post_pk: comment.post_pk
                });
            }

            function update(id, data){
                return $http.put('/api/v1/comments/' + comment.id + '/', {
                    body: data.body || null,
                    post_pk: data.post_pk || null
                });
            }

            function delete_comment(id){
                return $http.delete('/api/v1/' + id + '/');
            }

            return Comment;
        }]);
})();
