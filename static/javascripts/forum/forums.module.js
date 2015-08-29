(function(){
    'use strict';

    // forum module. Dependecy of forum app.
    angular.module('forum.forums', [
        'forum.forums.services',
        'forum.forums.controllers'
    ]);

    angular.module('forum.forums.services', []);
    angular.module('forum.forums.controllers', []);
})();
