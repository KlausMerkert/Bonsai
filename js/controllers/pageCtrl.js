'use strict';

bonsaiApp.controller('bonsaiPageCtrl',
    function ($scope, $rootScope) {
        $scope.lang = 'de';
        $rootScope.viewsCount = 42;

        $scope.$watch('author', function (author) {
            $rootScope.author = author;
        });
    }
);