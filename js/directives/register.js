'use strict';

bonsaiApp.directive('register', function ($interval) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            value: '=',
            registerName: '@',
            base: '=',
            top: '=',
            left: '='
        },
        controller: function ($scope, $filter) {
            $scope.data = $scope.value;
            if (parseInt($scope.base) in {2:true, 8:true, 10:true, 16:true}) {
                $scope.displayBase = $scope.base;
            } else {
                $scope.displayBase = 10;
            }

            $scope.dataChangeCallback = function (data) {
                if ($scope.displayBase === 2) {
                    $scope.data = $filter('binary')(data);
                } else if ($scope.displayBase === 8) {
                    $scope.data = $filter('octal')(data);
                } else if ($scope.displayBase === 16) {
                    $scope.data = $filter('hexadecimal')(data);
                } else {
                    $scope.data = data;
                }
            };

            $scope.register = new Register($scope.dataChangeCallback, $scope.registerName, $scope.data);
            $scope.topCSS = $scope.top + 'em';
            $scope.leftCSS = $scope.left + 'em';

            $scope.toggleState = function (connection) {
                var connections = $scope.register.getBuses();
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

            this.addBusConnection = function (bus, setWrite, setRead) {
                $scope.register.addBusConnection(bus, setWrite, setRead);
            };
        },
        link: function ($scope, element, attrs) {
            attrs.$observe('registerName', function() {
                if ($scope.registerName) {
                    $scope.register.setName($scope.registerName);
                }
            });

            $scope.$watch('data', function(newValue, oldValue) {
                if (newValue != undefined) {
                    newValue = String(newValue);
                    if ($scope.displayBase === 2) {
                        if (newValue.match(/[0,1]*/)[0] === newValue) {
                            var convertedValue = 0;
                            for (var i = 1; i <= newValue.length; i++) {
                                convertedValue += parseInt(newValue[i - 1]) * Math.pow(2, newValue.length - i);
                            }
                            $scope.register.setValue(convertedValue);
                        } else {
                            $scope.data = oldValue;
                        }
                    } else if ($scope.displayBase === 8) {
                        if (newValue.match(/[0-7]*/)[0] === newValue) {
                            convertedValue = 0;
                            for (i = 1; i <= newValue.length; i++) {
                                convertedValue += parseInt(newValue[i - 1]) * Math.pow(8, newValue.length - i);
                            }
                            $scope.register.setValue(convertedValue);
                        } else {
                            $scope.data = oldValue;
                        }
                    } else if ($scope.displayBase === 16) {
                        if (newValue.match(/[0-9,a-f]*/)[0] === newValue) {
                            convertedValue = 0;
                            for (i = 1; i <= newValue.length; i++) {
                                var digit = parseInt(newValue[i - 1]);
                                if (newValue[i - 1] === 'a') {
                                    digit = 10;
                                } else if (newValue[i - 1] === 'b') {
                                    digit = 11;
                                } else if (newValue[i - 1] === 'c') {
                                    digit = 12;
                                } else if (newValue[i - 1] === 'd') {
                                    digit = 13;
                                } else if (newValue[i - 1] === 'e') {
                                    digit = 14;
                                } else if (newValue[i - 1] === 'f') {
                                    digit = 15;
                                }
                                convertedValue += digit * Math.pow(16, newValue.length - i);
                            }
                            $scope.register.setValue(convertedValue);
                        } else {
                            $scope.data = oldValue;
                        }
                    } else {
                        if (newValue.match(/[0-9]*/)[0] === newValue) {
                            $scope.register.setValue(newValue);
                        } else {
                            $scope.data = oldValue;
                        }
                    }
                }
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
                if (connection.bus.isReader($scope.register)) { // If we are reading then we want to stop it.
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
                if (connection.bus.isWriter($scope.register)) { // If we are writing then we want to stop it.
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
                var connections = $scope.register.getBuses();
                for (var i = 0; i < connections.length; i++) {
                    if (connections[i].bus === bus) {
                        if (i % 2 == 0) {
                            positions.push({top: $scope.top-1.2, left: $scope.left+2.08});
                        } else {
                            positions.push({top: $scope.top+3, left: $scope.left+2.08});
                        }
                    }
                }
                return positions;
            };

            $scope.getWireConnectionPositions = function (wire) {
                var positions = [];
                var connections = $scope.register.getBuses();
                for (var i = 0; i < connections.length; i++) {
                    if ((connections[i].writeWire) && (connections[i].writeWire === wire)) {
                        if (i % 2 == 0) {
                            positions.push({top: $scope.top-0.82, left: $scope.left+2.68});
                        } else {
                            positions.push({top: $scope.top+2.62, left: $scope.left+2.68});
                        }
                    }
                    if ((connections[i].readWire) && (connections[i].readWire === wire)) {
                        if (i % 2 == 0) {
                            positions.push({top: $scope.top-0.42, left: $scope.left+2.68});
                        } else {
                            positions.push({top: $scope.top+2.22, left: $scope.left+2.68});
                        }
                    }
                }
                return positions;
            };

            // We have to wait for a very short time to enroll to the buses
            // because the handler needs to be fully initialized.
            $interval(function () {
                var connections = $scope.register.getBuses();
                for (var i = 0; i < connections.length; i++) {
                    connections[i].bus.enrollToDirective(
                        $scope.register,
                        $scope.getConnectionPositions
                    );
                    var writeWire = connections[i].writeWire;
                    if (writeWire) {
                        var writeConnector = new ReadingControlWireConnector(writeWire,
                            function (wire) {
                                $scope.register.setToWrite(wire);
                            },
                            function (wire) {
                                $scope.register.setToDisconnected(wire);
                            });
                        writeWire.connectToDirective(writeConnector, $scope.getWireConnectionPositions);
                    }
                    var readWire = connections[i].readWire;
                    if (readWire) {
                        var readConnector = new ReadingControlWireConnector(readWire,
                            function (wire) {
                                $scope.register.setToRead(wire);
                            },
                            function (wire) {
                                $scope.register.setToDisconnected(wire);
                            });
                        readWire.connectToDirective(readConnector, $scope.getWireConnectionPositions);
                    }
                }
            }, 1, 1);
        },
        templateUrl: 'partials/component_Register.html'
    };
});

bonsaiApp.directive('gate', function () {
    return {
        require: '^register',
        restrict: 'E',
        scope: {
            bus: '=',
            setWrite: '=',
            setRead: '='
        },
        link: function ($scope, element, attrs, registerCtrl) {
            registerCtrl.addBusConnection($scope.bus, $scope.setWrite, $scope.setRead);
        },
        template: ''
    };
});

