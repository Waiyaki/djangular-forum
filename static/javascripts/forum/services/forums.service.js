(function(){
    'use strict';

    angular.module('forum.forums.services')
        .factory('Forum', ['$http', function($http){
            var Forum = {
                all: all,
                create: create,
                update: update,
                threads: threads
            };

            function all() {
                return $http.get('/api/v1/forums/');
            }

            function create(title, description) {
                return $http.post('/api/v1/forums/', {
                    title: title,
                    description: description
                });
            }

            function update(title, description){
                return $http.put('/api/v1/forums/', {
                    title: title,
                    description: description
                });
            }

            function threads(forum_slug){
                return $http.get('/api/v1/forums/' + forum_slug + '/threads/');
            }

            return Forum;
        }]);
})();
