'use strict';

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
            $scope.register = new Register(function (data) {
                $scope.data = data;
            }, $scope.data);
            $scope.topCSS = $scope.top + 'em';
            $scope.leftCSS = $scope.left + 'em';

            $scope.toggleState = function (connection) {
                var connections = $scope.register.getConnections();
                for (var i = 0; i < connections.length; i++) {
                    if (connections[i].bus === connection.bus) {
                        var stateFound = false;
                        var desiredState = connections[i].state - 1;
                        while (!stateFound) {
                            if (desiredState < -1) {
                                desiredState = 1;
                            }
                            try {
                                $scope.setState(connections[i], desiredState);
                                connections[i].state = desiredState;
                                stateFound = true;
                            } catch (exception) {
                                desiredState--;
                            }
                        }
                    }
                }
            };

            this.addConnection = function (bus) {
                $scope.register.addConnection(bus);
            };
        },
        link: function ($scope, element, attrs) {
            $scope.$watch('data', function(newValue, oldValue) {
                $scope.register.setValue(newValue);
            });

            $scope.setValue = function (value) {
                $scope.register.setValue(value);
            };

            $scope.setState = function (connection, desiredState) {
                window.getSelection().removeAllRanges(); // Hack to unselect the arrows to keep the color visible.
                $scope.register.setState(connection, desiredState);
            };

            $scope.toggleRead = function (connection) {
                var state = -1;
                if (connection.bus.isReading($scope.register)) { // If we are reading then we want to stop it.
                    state = 0;
                }
                try {
                    $scope.setState(connection, state);
                    connection.state = state;
                } catch (exception) {
                    throw exception;
                }
            };

            $scope.toggleWrite = function (connection) {
                var state = 1;
                if (connection.bus.isWriting($scope.register)) { // If we are writing then we want to stop it.
                    state = 0;
                }
                try {
                    $scope.setState(connection, state);
                    connection.state = state;
                } catch (exception) {
                    throw exception;
                }
            };

            $scope.getConnectionPositions = function (bus) {
                var positions = [];
                var connections = $scope.register.getConnections();
                for (var i = 0; i < connections.length; i++) {
                    if (connections[i].bus == bus) {
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
                var connections = $scope.register.getConnections();
                for (var i = 0; i < connections.length; i++) {
                    connections[i].bus.enrollToDirective(
                        $scope.register,
                        $scope.setValue,
                        $scope.getConnectionPositions
                    );
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
            bus: '='
        },
        link: function ($scope, element, attrs, registerCtrl) {
            registerCtrl.addConnection($scope.bus);
        },
        template: ''
    };
});

