bonsaiApp.directive('register', function ($interval) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            value: '=',
            top: '=',
            left: '='
        },
        controller: function ($scope) {
            $scope.data = $scope.value;
            $scope.topCSS = $scope.top + 'em';
            $scope.leftCSS = $scope.left + 'em';
            $scope.connections = [];

            $scope.toggleState = function (connection) {
                for (var i = 0; i < $scope.connections.length; i++) {
                    if ($scope.connections[i].handler == connection.handler) {
                        var stateFound = false;
                        var desiredState = $scope.connections[i].state - 1;
                        while (!stateFound) {
                            if (desiredState < -1) {
                                desiredState = 1;
                            }
                            try {
                                $scope.setState($scope.connections[i], desiredState);
                                $scope.connections[i].state = desiredState;
                                stateFound = true;
                            } catch (exception) {
                                desiredState--;
                            }
                        }
                    }
                }
            };

            this.addConnection = function (handler) {
                $scope.connections.push({state: 0, handler: handler});
            };
        },
        link: function ($scope, element, attrs) {
            $scope.setValue = function (value) {
                $scope.data = value;
                for (var i = 0; i < $scope.connections.length; i++) {
                    if ($scope.connections[i].state == 1) {
                        $scope.connections[i].handler.write(element, value);
                    }
                }
            };

            $scope.setState = function (connection, desiredState) {
                var readState = connection.handler.isReading(element);
                var writeState = connection.handler.isWriting(element);
                if (desiredState == 1) {
                    connection.handler.stopReading(element);
                    try {
                        connection.handler.write(element, $scope.data);
                        for (var i = 0; i < $scope.connections.length; i++) {
                            if (!angular.equals($scope.connections[i], connection) && $scope.connections[i].state == -1) {
                                $scope.setValue($scope.connections[i].handler.startReading(element));
                            }
                        }
                        connection.state = desiredState;
                    } catch (exception) {
                        if (readState) {
                            connection.handler.startReading(element);
                        }
                        throw exception;
                    }
                } else if (desiredState == -1) {
                    connection.handler.stopWriting(element);
                    try {
                        $scope.setValue(connection.handler.startReading(element));
                        connection.state = desiredState;
                    } catch (exception) {
                        if (writeState) {
                            connection.handler.write(element, $scope.data);
                        }
                        throw exception;
                    }
                } else {
                    connection.handler.stopWriting(element);
                    connection.handler.stopReading(element);
                    connection.state = desiredState;
                    for (i = 0; i < $scope.connections.length; i++) {
                        if (!angular.equals($scope.connections[i], connection) && $scope.connections[i].state == -1) {
                            $scope.setValue($scope.connections[i].handler.startReading(element));
                        }
                    }
                }
            };

            $scope.getConnectionPositions = function (busHandler) {
                var positions = [];
                for (var i = 0; i < $scope.connections.length; i++) {
                    if ($scope.connections[i].handler == busHandler) {
                        if (i%2 == 0) {
                            positions.push({top: $scope.top-1.2, left: $scope.left+2.08});
                        } else {
                            positions.push({top: $scope.top+3, left: $scope.left+2.08});
                        }
                    }
                }
                return positions;
            };

            // We have to wait for a very short time to enroll to the busses
            // because the handler needs to be fully initialized.
            $interval(function () {
                for (var i = 0; i < $scope.connections.length; i++) {
                    $scope.connections[i].handler.enroll(element, $scope.setValue, $scope.getConnectionPositions);
                }
            }, 1, 1);
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

