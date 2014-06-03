'use strict';

bonsaiApp.directive('bus', function () {
    return {
        restrict: 'E',
        scope: {
            handler: '=',
            color: '=',
            top: '=',
            left: '='
        },
        link: function ($scope, element, attrs) {
            $scope.localHandler = $scope.handler || {};
            $scope.topCSS = $scope.top + 'em';
            $scope.leftCSS = $scope.left + 'em';

            $scope.connections = [];

            $scope.value = null;
            $scope.active = false;
            $scope.writerIndex = -1;

            $scope.busRouter = new BusRouter($scope.connections, $scope.localHandler);

            $scope.findInConnections = function (enrollee) {
                var index = -1;
                for (var i = 0; i < $scope.connections.length; i++) {
                    if ($scope.connections[i].enrollee == enrollee) {
                        index = i;
                    }
                }
                return index;
            };

            $scope.updateVisibleParts = function() {
                $scope.busRouter.setConnections($scope.connections);
                $scope.visibleParts = $scope.busRouter.updateVisibleParts();
            };

            $scope.localHandler.enroll = function (enrollee, callback, getPositions) {
                $scope.connections.push({
                    enrollee: enrollee,
                    is_reading: false,
                    callback: callback,
                    getPositions: getPositions
                });
                $scope.updateVisibleParts();
            };

            $scope.localHandler.resign = function (resigner) {
                var index = findInConnections(resigner);
                if (index >= 0) {
                    $scope.connections.splice(index, 1);
                }
            };

            $scope.localHandler.registerMovement = function () {
                $scope.updateVisibleParts()
            };

            $scope.localHandler.startReading = function (reader) {
                var index = $scope.findInConnections(reader);
                if (index >= 0) {
                    $scope.connections[index].is_reading = true;
                    return $scope.value;
                } else {
                    throw NotEnrolledReadException(
                        reader + " is not enrolled to the bus an can not read.",
                        reader
                    );
                }
            };

            $scope.localHandler.stopReading = function (reader) {
                var index = $scope.findInConnections(reader);
                if (index >= 0) {
                    $scope.connections[index].is_reading = false;
                }
            };

            $scope.localHandler.isReading = function (reader) {
                var index = $scope.findInConnections(reader);
                if (index >= 0) {
                    return $scope.connections[index].is_reading;
                }
                return false;
            };

            $scope.localHandler.write = function (writer, data) {
                var index = $scope.findInConnections(writer);
                if (index >= 0) {
                    if ($scope.active && $scope.writerIndex != index) {
                        throw BusOccupiedException(
                            "This bus is already occupied by enrollee no.: " + $scope.writerIndex + ".",
                            $scope.writerIndex
                        );
                    } else {
                        $scope.connections[index].is_reading = false;
                        $scope.writerIndex = index;
                        $scope.active = true;
                        if ($scope.value != data) {
                            $scope.value = data;
                            for (var i = 0; i < $scope.connections.length; i++) {
                                if ($scope.connections[i].is_reading) {
                                    $scope.connections[i].callback($scope.value);
                                }
                            }
                        }
                    }
                } else {
                    throw NotEnrolledWriteException(
                        writer + " is not enrolled to the bus an can not write.",
                        writer
                    );
                }
            };

            $scope.localHandler.stopWriting = function (writer) {
                var index = $scope.findInConnections(writer);
                if (index >= 0) {
                    if (index == $scope.writerIndex) {
                        $scope.active = false;
                        $scope.writerIndex = -1;
                        $scope.value = null;
                    }
                }
            };

            $scope.localHandler.isWriting = function (writer) {
                var index = $scope.findInConnections(writer);
                if (index >= 0) {
                    if (index == $scope.writerIndex) {
                        return true;
                    }
                }
                return false;
            };
        },
        templateUrl: 'partials/component_Bus.html'
    }
});