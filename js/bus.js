bonsaiApp.directive('bus', function () {
    return {
        restrict: 'E',
        scope: {
            handler: '='
        },
        link: function ($scope, element, attrs) {
            $scope.localHandler = $scope.handler || {};

            $scope.connections = [];

            $scope.value = null;
            $scope.active = false;
            $scope.writerIndex = -1;

            var findInConnections= function (enrollee) {
                var index = -1;
                for (var i = 0; i < $scope.connections.length; i++) {
                    if ($scope.connections[i].enrollee == enrollee) {
                        index = i;
                    }
                }
                return index;
            };

            var updateVisibleParts = function () {
                // get the grid

                // recursively find all good connections in the grid

                // combine connections to parts
                var parts = [];

                // set the parts
                parts.push({type: 'horizontal', top: '7em', left: '5em', width: '3em', height: '1em'});
                parts.push({type: 'topright', top: '7em', left: '8em', width: '3em', height: '1em'});
                $scope.visibleParts = parts;
            };

            $scope.localHandler.enroll = function (enrollee, callback, getPosition) {
                $scope.connections.push({
                    enrollee: enrollee,
                    is_reading: false,
                    callback: callback,
                    getPosition: getPosition
                });
                updateVisibleParts();
            };

            $scope.localHandler.resign = function (resigner) {
                var index = findInConnections(resigner);
                if (index >= 0) {
                    $scope.connections.splice(index, 1);
                }
            };

            $scope.localHandler.registerMovement = function () {
                updateVisibleParts()
            };

            $scope.localHandler.startReading = function (reader) {
                var index = findInConnections(reader);
                if (index >= 0) {
                    $scope.connections[index].is_reading = true;
                    return $scope.value;
                } else {
                    throw reader + " is not enrolled to the bus an can not read.";
                }
            };

            $scope.localHandler.stopReading = function (reader) {
                var index = findInConnections(reader);
                if (index >= 0) {
                    $scope.connections[index].is_reading = false;
                }
            };

            $scope.localHandler.write = function (writer, data) {
                var index = findInConnections(writer);
                if (index >= 0) {
                    if ($scope.active && $scope.writerIndex != index) {
                        throw "This bus is already occupied by " +
                            $scope.connections[$scope.writerIndex].enrollee + ".";
                    } else {
                        $scope.connections[index].is_reading = false;
                        $scope.writerIndex = index;
                        $scope.active = true;
                        $scope.value = data;
                        for (var i = 0; i < $scope.connections.length; i++) {
                            if ($scope.connections[i].is_reading) {
                                $scope.connections[i].callback($scope.value);
                            }
                        }
                    }
                } else {
                    throw writer + " is not enrolled to the bus an can not write.";
                }
            };

            $scope.localHandler.stopWriting = function (writer) {
                var index = findInConnections(writer);
                if (index >= 0) {
                    if (index == $scope.writerIndex) {
                        $scope.active = false;
                        $scope.writerIndex = -1;
                        $scope.value = null;
                    }
                }
            };
        },
        templateUrl: 'partials/component_Bus.html'
    }
});