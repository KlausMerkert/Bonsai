'use strict';

bonsaiApp.directive('manualswitch', function () {
    return {
        restrict: 'E',
        transclude: false,
        scope: {
            wire: '=',
            value: '=',
            switchName: '@',
            top: '=',
            left: '=',
            color: '='
        },
        link: function ($scope, element, attrs) {
            $scope.colorCSS = 'rgb(255, 0, 0)';

            $scope.switch = new ManualSwitch(function (value) {
                $scope.value = value;
            }, $scope.wire, undefined);

            $scope.toggle = function () {
                $scope.switch.toggle();
            };

            attrs.$observe('switchName', function() {
                if ($scope.switchName) {
                    $scope.switch.setName($scope.switchName);
                }
            });

            $scope.$watch('value', function(newValue, oldValue) {
                if (newValue != oldValue) {
                    $scope.switch.setValue(newValue);
                }
            });

            $scope.$watch('top', function () {
                $scope.topCSS = ($scope.top - 7) + 'px';
            });
            $scope.$watch('left', function () {
                $scope.leftCSS = ($scope.left + 3) + 'px';
            });

            $scope.$watch('color', function (newValue) {
                if (newValue) {
                    $scope.colorCSS = $scope.color;
                }
            });

            $scope.getConnectionPositions = function () {
                return [{top: $scope.top, left: $scope.left}];
            };

            $scope.$watch('wire', function (newWire, oldWire) {
                if (newWire) {
                    newWire.enrollToDirective(
                        $scope.switch,
                        $scope.getConnectionPositions
                    );
                }
                if (oldWire && (newWire != oldWire)) {
                    oldWire.resign($scope.switch);
                }
            });

            $scope.$emit('componentInitialized', $scope);

            $scope.$on('sendInitialValues', function (event, message) {
                $scope.switch.setValue($scope.value);
            });
        },
        templateUrl: 'partials/component_ManualSwitch.html'
    };
});