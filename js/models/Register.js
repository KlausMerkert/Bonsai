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