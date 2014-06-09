'use strict';

bonsaiApp.directive('manualswitch', function ($interval) {
    return {
        restrict: 'E',
        transclude: false,
        scope: {
            wire: '=',
            value: '=',
            switchName: '@',
            top: '=',
            left: '='
        },
        controller: function ($scope) {
            $scope.switch = new ManualSwitch($scope.wire, $scope.value);
            $scope.topCSS = $scope.top + 'em';
            $scope.leftCSS = $scope.left + 'em';

            $scope.toggle = $scope.switch.toggle;
        },
        link: function ($scope, element, attrs) {
            attrs.$observe('switchName', function() {
                if ($scope.switchName) {
                    $scope.switch.setName($scope.switchName);
                }
            });

            $scope.getConnectionPositions = function () {
                return [{top: $scope.top+3, left: $scope.left+2.08}];
            };
        },
        templateUrl: 'partials/component_ManualSwitch.html'
    };
});