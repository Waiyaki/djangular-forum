(function(){
    'use strict';

    // forum module. Dependecy of forum app.
    angular.module('forum.forums', [
        'forum.forums.services',
        'forum.forums.controllers',
        'forum.forums.directives'
    ]);

    angular.module('forum.forums.services', []);
    angular.module('forum.forums.controllers', ['ngMessages']);
    angular.module('forum.forums.directives', []);
})();
