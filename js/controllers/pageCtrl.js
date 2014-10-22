'use strict';

bonsaiApp.controller('bonsaiPageCtrl',
    function ($scope, $location) {
        console.log($location.path());
        $scope.lang = 'de';
    }
);