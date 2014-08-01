'use strict';

bonsaiApp.directive('delay', function ($interval) {
    return {
        restrict: 'E',
        transclude: false,
        scope: {
            busLeft: '=',
            busRight: '=',
            delay: '=',
            top: '=',
            left: '=',
            delayName: '@'
        },
        link: function ($scope, element, attrs) {
            $scope.delayObject = new Delay($scope.delay);

            $scope.delayObject.delayCall = function (value, bus) {
                $scope.$apply(function () {
                    $scope.delayObject.delayedActions(value, bus);
                });
            };

            $scope.showValue = false;
            $scope.toggleShowValue = function () {
                $scope.showValue = !$scope.showValue;
            };

            $scope.$watch('busLeft', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    if (oldValue) {
                        $scope.delayObject.removeBus(oldValue);
                    }
                }
                if (newValue) {
                    $scope.delayObject.addBus(newValue);
                }
            });
            $scope.$watch('busRight', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    if (oldValue) {
                        $scope.delayObject.removeBus(oldValue);
                    }
                }
                if (newValue) {
                    $scope.delayObject.addBus(newValue);
                }
            });

            $scope.$watch('delay', function () {
                $scope.delayObject.setDelay($scope.delay);
            });

            $scope.$watch('top', function () {
                $scope.topCSS = ($scope.top - 2) + 'px';
            });
            $scope.$watch('left', function () {
                $scope.leftCSS = $scope.left + 'px';
            });

            attrs.$observe('delayName', function() {
                if ($scope.delayName) {
                    $scope.delayObject.setName($scope.delayName);
                }
            });

            $scope.getConnectionPositions = function (bus) {
                if (bus === $scope.busLeft) {
                    return [{top: $scope.top, left: ($scope.left - 2)}];
                } else if (bus === $scope.busRight) {
                    return [{top: $scope.top, left: ($scope.left + 19)}];
                } else {
                    console.log("This bus is not connected: " + bus.getName());
                }
            };

            // We have to wait for a very short time to enroll to the buses
            // because the wire needs to be fully initialized.
            $interval(function () {
                if ($scope.busLeft) {
                    $scope.busLeft.enrollToDirective($scope.delayObject, $scope.getConnectionPositions);
                    $scope.busLeft.registerReaderAndRead($scope.delayObject);
                }
                if ($scope.busRight) {
                    $scope.busRight.enrollToDirective($scope.delayObject, $scope.getConnectionPositions);
                    $scope.busRight.registerReaderAndRead($scope.delayObject);
                }
            }, 1, 1);
        },
        templateUrl: 'partials/component_Delay.html'
    };
});