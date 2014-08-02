'use strict';

bonsaiApp.directive('clock', function ($interval) {
    return {
        restrict: 'E',
        transclude: false,
        scope: {
            wire: '=',
            frequency: '=',
            clockName: '@',
            top: '=',
            left: '='
        },
        link: function ($scope, element, attrs) {
            $scope.clock = new Clock(function (value) {
                $scope.value = value;
            }, $scope.wire, $scope.frequency);

            $scope.clock.doTick = function () {
                $scope.$apply(function () {
                    $scope.clock.tick();
                })
            };

            $scope.toggle = function () {
                $scope.clock.toggle();
            };

            attrs.$observe('clockName', function() {
                if ($scope.clockName) {
                    $scope.clock.setName($scope.clockName);
                }
            });

            $scope.$watch('value', function(newValue, oldValue) {
                if (newValue != oldValue) {
                    $scope.clock.setValue(newValue);
                }
            });

            $scope.$watch('frequency', function () {
                if (parseInt($scope.frequency)) {
                    $scope.clock.setFrequency($scope.frequency);
                    $scope.clock.start();
                } else {
                    $scope.clock.stop();
                }
            });

            $scope.$watch('top', function () {
                $scope.topCSS = ($scope.top - 10) + 'px';
            });
            $scope.$watch('left', function () {
                $scope.leftCSS = ($scope.left + 3) + 'px';
            });

            $scope.highFlank = function () {
                $scope.clock.setValue(1);
            };

            $scope.lowFlank = function () {
                $scope.clock.setValue(0);
            };

            $scope.getConnectionPositions = function () {
                return [{top: $scope.top, left: $scope.left}];
            };

            // We have to wait for a very short time to enroll to the buses
            // because the handler needs to be fully initialized.
            $interval(function () {
                $scope.wire.enrollToDirective(
                    $scope.clock,
                    $scope.getConnectionPositions
                );
                if ($scope.frequency) {
                    $scope.clock.start();
                }
            }, 1, 1);
        },
        templateUrl: 'partials/component_Clock.html'
    };
});