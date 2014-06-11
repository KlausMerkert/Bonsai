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
            $scope.data = $scope.value;
            $scope.switch = new ManualSwitch(function (value) {
                $scope.data = value;
            }, $scope.wire, $scope.value);
            $scope.topCSS = ($scope.top - 0.55) + 'em';
            $scope.leftCSS = ($scope.left + 0.16) + 'em';

            $scope.toggle = function () {
                $scope.switch.toggle();
            }
        },
        link: function ($scope, element, attrs) {
            attrs.$observe('switchName', function() {
                if ($scope.switchName) {
                    $scope.switch.setName($scope.switchName);
                }
            });

            $scope.$watch('data', function(newValue, oldValue) {
                if (newValue != oldValue) {
                    $scope.switch.setValue(newValue);
                }
            });

            $scope.getConnectionPositions = function () {
                return [{top: $scope.top, left: $scope.left}];
            };

            $scope.switch.getPositions = $scope.getConnectionPositions;
        },
        templateUrl: 'partials/component_ManualSwitch.html'
    };
});