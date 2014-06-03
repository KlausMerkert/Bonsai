'use strict';

function Register(updateViewCallback, initialValue) {
    this.updateViewCallback = updateViewCallback;
    this.value = initialValue;
    this.connections = [];
}

Register.prototype.addConnection = function (bus) {
    /* Connections can have three states:
     * 1 means the register writes to the bus
     * 0 means the connection is inactive
     * -1 means the register reads from the bus */
    this.connections.push({state: 0, bus: bus})
};

Register.prototype.removeConnection = function (bus) {
    for (var i = 0; i < this.connections.length; i++) {
        if (this.connections[i].bus === bus) {
            this.connections.splice(i, 1);
            i--;
        }
    }
};

Register.prototype.getConnections = function () {
    return this.connections;
};

Register.prototype.setValue = function (value) {
    this.value = value;
    this.updateViewCallback(this.value);
    for (var i = 0; i < this.connections.length; i++) {
        if (this.connections[i].state === 1) {
            this.connections[i].bus.write(this, value);
        }
    }
};

Register.prototype.getValue = function () {
    return this.value;
};

Register.prototype.setState = function (connection, desiredState) {
    var readState = connection.bus.isReading(this);
    var writeState = connection.bus.isWriting(this);
    if (desiredState == 1) {
        connection.bus.stopReading(this);
        try {
            connection.bus.write(this, this.getValue());
            for (var i = 0; i < this.connections.length; i++) {
                if (!angular.equals(this.connections[i], connection) && this.connections[i].state == -1) {
                    this.setValue(this.connections[i].bus.startReading(this));
                }
            }
            connection.state = desiredState;
        } catch (exception) {
            if (readState) {
                connection.bus.startReading(this);
            }
            throw exception;
        }
    } else if (desiredState == -1) {
        connection.bus.stopWriting(this);
        try {
            this.setValue(connection.bus.startReading(this));
            connection.state = desiredState;
        } catch (exception) {
            if (writeState) {
                connection.bus.write(this, this.value);
            }
            throw exception;
        }
    } else {
        connection.bus.stopWriting(this);
        connection.bus.stopReading(this);
        connection.state = desiredState;
        for (i = 0; i < this.connections.length; i++) {
            if (!angular.equals(this.connections[i], connection) && this.connections[i].state == -1) {
                this.setValue(this.connections[i].bus.startReading(this));
            }
        }
    }
};