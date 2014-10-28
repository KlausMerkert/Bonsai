'use strict';

bonsaiApp.controller('bonsaiPageCtrl',
    function ($scope, $rootScope) {
        $rootScope.viewsCount = 42;
        $rootScope.lastChange = Date.now();

        $scope.$watch('author', function (author) {
            $rootScope.author = author;
        });
    }
);