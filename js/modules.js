bonsaiApp.directive('register', function () {
    return {
        restrict: 'E',
        scope: {
            value: '='
        },
        controller: function ($scope) {
            $scope.data = $scope.value;
        },
        templateUrl: 'partials/component_Register.html'
    };
});
