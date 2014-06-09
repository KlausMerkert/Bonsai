'use strict';

bonsaiApp.directive('control-wire', function () {
    return {
        restrict: 'E',
        scope: {
            wire: '=',
            wireName: '@'
        },
        link: function ($scope, element, attrs) {
            $scope.localWire = $scope.wire || {};

            attrs.$observe('wireName', function() {
                if ($scope.wireName) {
                    $scope.localWire.setName($scope.wireName);
                }
            });

            $scope.busRouter = new BusRouter($scope.localWire.getConnections(), $scope.localWire);

            $scope.value = 0;

            $scope.localWire.setUpdateViewCallback(function (newValue) {
                $scope.value = newValue;
            });

            $scope.$watch('value', function(newValue, oldValue) {
                $scope.localWire.setValue(newValue);
            });

            $scope.updateVisibleParts = function() {
                $scope.busRouter.setConnections($scope.localWire.getConnections());
                $scope.visibleParts = $scope.busRouter.updateVisibleParts();
            };

            $scope.localWire.connectToDirective = function (connector, getPositions) {
                var connection = $scope.localWire.connect(connector);
                connection.getPositions = getPositions;
                $scope.updateVisibleParts();
            };

            $scope.localWire.registerMovement = function () {
                $scope.updateVisibleParts();
            };
        },
        templateUrl: 'partials/component_Wire.html'
    }
});