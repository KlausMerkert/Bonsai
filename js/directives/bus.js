'use strict';

bonsaiApp.directive('bus', function () {
    return {
        restrict: 'E',
        scope: {
            bus: '=',
            maxValue: '=',
            busName: '@',
            base: '=',
            color: '=',
            top: '=',
            left: '=',
            routes: '='
        },
        link: function ($scope, element, attrs) {
            $scope.localBus = $scope.bus || {};

            attrs.$observe('busName', function () {
                if ($scope.busName) {
                    $scope.localBus.setName($scope.busName);
                }
            });

            $scope.$watch('base', function () {
                if (parseInt($scope.base) in {2:true, 8:true, 10:true, 16:true}) {
                    $scope.displayBase = $scope.base;
                } else {
                    $scope.displayBase = 10;
                }
            });

            $scope.$watch('top', function () {
                $scope.topCSS = $scope.top + 'px';
            });
            $scope.$watch('left', function () {
                $scope.leftCSS = $scope.left + 'px';
            });

            $scope.$watch('maxValue', function () {
                if ($scope.maxValue) {
                    $scope.localBus.setMax($scope.maxValue);
                } else {
                    $scope.localBus.setMax(1);
                }
            });

            $scope.displayWidth = function (highlight) {
                if ($scope.localBus.getWidth() > 1) {
                    if (highlight) {
                        return '3px';
                    } else {
                        return '2px';
                    }
                } else {
                    if (highlight) {
                        return '2px';
                    } else {
                        return '1px';
                    }
                }
            };

            if (!$scope.routes) {
                $scope.busRouter = new BusRouter($scope.localBus.getBuses(), $scope.localBus);
            }

            $scope.value = undefined;

            $scope.localBus.setUpdateViewCallback(function (newValue) {
                    $scope.value = newValue;
            });

            $scope.$watch('value', function(newValue) {
                if (newValue != $scope.localBus.getValue()) {
                    $scope.localBus.setValue(newValue);
                }
            });

            $scope.updateVisibleParts = function() {
                if ($scope.routes) {
                    $scope.visibleParts = $scope.routes;
                } else {
                    $scope.busRouter.setConnections($scope.localBus.getBuses());
                    $scope.visibleParts = $scope.busRouter.updateVisibleParts();
                }
            };

            $scope.$watch('routes', function(newValue, oldValue) {
                if (newValue != oldValue) {
                    $scope.updateVisibleParts();
                }
            });

            $scope.localBus.enrollToDirective = function (enrollee, getPositions) {
                var connection = $scope.localBus.enroll(enrollee);
                connection.getPositions = getPositions;
                $scope.updateVisibleParts();
            };

            $scope.localBus.registerMovement = function () {
                $scope.updateVisibleParts();
            };

            $scope.localBus.getColor = function (fullColor) {
                if ($scope.color) {
                    if ($scope.localBus.isActive() || fullColor) {
                        return $scope.color;
                    } else {
                        var colors = $scope.color.match(/\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)/);
                        return "rgba(" + colors[1] + "," + colors[2] + "," + colors[3] + ",0.5)"
                    }
                } else {
                    return 'rgba(140, 140, 140, 0.6)';
                }
            };
        },
        templateUrl: 'partials/component_Bus.html'
    }
});