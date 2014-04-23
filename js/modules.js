bonsaiApp.directive('register', function () {
    return {
        restrict: 'E',
        scope: {
            value: '='
        },
        controller: function ($scope) {
            $scope.data = $scope.value+1;
        },
        templateUrl: 'partials/processorRegister.html'
    };
});
