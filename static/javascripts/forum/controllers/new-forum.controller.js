(function(){
    'use strict';

    angular.module('forum.forums.controllers')
        .controller('NewForumController', ['Forum', '$location', '$mdToast', function(Forum, $location, $mdToast){
            var vm = this;

            vm.create = function(){
                var title = vm.forum.title;
                var description = vm.forum.description || null;
                Forum.create(title, description).then(function(success){
                    $mdToast.showSimple('Success! Forum "' + vm.forum.title +'" created.');
                    // vm.forum = {}; // clear the filled in fields.
                    $location.path('/forums/');
                }, function(error){
                    $mdToast.showSimple('Error creating forum "' + vm.forum.title + '". Please try again.');
                });
            };
        }]);
})();
