bonsaiApp.directive('bonsaiProcessor', function () {
    return {
        restrict: 'E',
        scope: {
            data: '=register'
        },
        controller: function ($scope) {
            $scope.arg = "riansezani";
        },
        templateUrl: 'partials/processorRegister.html'
    };
});
