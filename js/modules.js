bonsaiApp.directive('register', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            value: '='
        },
        controller: function ($scope) {
            $scope.data = $scope.value;
            $scope.connections = [];

            $scope.toggleState = function (connection) {
                for (var i = 0; i < $scope.connections.length; i++) {
                    if ($scope.connections[i].handler == connection.handler) {
                        if ($scope.connections[i].state >= 1) {
                            $scope.connections[i].state = -1;
                        } else {
                            $scope.connections[i].state++;
                        }
                    }
                }
            };

            this.addConnection = function (handler) {
                $scope.connections.push({state: 0, handler: handler});
            };
        },
        link: function ($scope, element, attrs) {
            $scope.writeCallback = function (value) {
                $scope.data = value;
            };

            for (var i = 0; i < $scope.connections.length; i++) {
                $scope.connections[i].handler.enroll(element, $scope.writeCallback);
            }
        },
        templateUrl: 'partials/component_Register.html'
    };
});

bonsaiApp.directive('connection', function () {
    return {
        require: '^register',
        restrict: 'E',
        scope: {
            handler: '='
        },
        link: function ($scope, element, attrs, registerCtrl) {
            registerCtrl.addConnection($scope.handler);
        },
        template: ''
    };
});

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

            $scope.localHandler.enroll = function (enrollee, callback) {
                $scope.connections.push({enrollee: enrollee, is_reading: false, callback: callback})
            };

            $scope.localHandler.resign = function (resigner) {
                var index = findInConnections(resigner);
                if (index >= 0) {
                    $scope.connections.splice(index, 1);
                }
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
        }
    }
});
