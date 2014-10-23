'use strict';

bonsaiApp.controller('bonsaiPageCtrl',
    function ($scope, $rootScope) {
        $scope.lang = 'de';

        $scope.$watch('author', function (author) {
            $rootScope.author = author;
        });
    }
);