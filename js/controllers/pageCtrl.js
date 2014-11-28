'use strict';

bonsaiApp.controller('bonsaiPageCtrl',
    function ($scope, $rootScope) {
        $scope.$watch('author', function (author) {
            $rootScope.author = author;
        });
    }
);