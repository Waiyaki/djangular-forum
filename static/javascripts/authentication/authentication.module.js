(function(){
    'use strict';

    angular.module('forum.authentication', [
        'forum.authentication.controllers',
        'forum.authentication.services',
        'forum.authentication.directives'
    ]);

    angular.module('forum.authentication.controllers', ['ngMessages']);
    angular.module('forum.authentication.services', ['ngCookies']);
    angular.module('forum.authentication.directives', []);
})();
