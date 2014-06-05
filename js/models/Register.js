'use strict';

function Register(updateViewCallback, initialValue) {
    this.updateViewCallback = updateViewCallback;
    this.value = initialValue;
    this.buses = [];
}

Register.prototype.addConnection = function (bus) {
    /* Connections can have three states:
     * 1 means the register writes to the bus
     * 0 means the connection is inactive
     * -1 means the register reads from the bus */
    this.buses.push({state: 0, bus: bus})
};

Register.prototype.removeConnection = function (bus) {
    var i = 0;
    while (i < this.buses.length) {
        if (this.buses[i].bus === bus) {
            this.buses.splice(i, 1);
        } else {
            i++;
        }
    }
};

Register.prototype.getConnections = function () {
    return this.buses;
};

Register.prototype.setValue = function (value) {
    this.value = value;
    this.updateViewCallback(this.value);
    for (var i = 0; i < this.buses.length; i++) {
        if (this.buses[i].state === 1) {
            this.buses[i].bus.write(this, value);
        }
    }
};

Register.prototype.getValue = function () {
    return this.value;
};

Register.prototype.setState = function (busConnection, desiredState) {
    var readState = busConnection.bus.isReader(this);
    var writeState = busConnection.bus.isWriter(this);
    if (desiredState == 1) {
        busConnection.bus.unregisterReader(this);
        try {
            busConnection.bus.write(this, this.getValue());
            for (var i = 0; i < this.buses.length; i++) {
                if (!angular.equals(this.buses[i], busConnection) && this.buses[i].state == -1) {
                    this.setValue(this.buses[i].bus.registerReaderAndRead(this));
                }
            }
            busConnection.state = desiredState;
        } catch (exception) {
            if (readState) {
                busConnection.bus.registerReaderAndRead(this);
            }
            throw exception;
        }
    } else if (desiredState == -1) {
        if (this.isReader()) {
            throw RegisterIsAlreadyReadingException(
                "This Register is already reading.",
                this
            )
        } else {
            busConnection.bus.stopWriting(this);
            try {
                this.setValue(busConnection.bus.registerReaderAndRead(this));
                busConnection.state = desiredState;
            } catch (exception) {
                if (writeState) {
                    busConnection.bus.write(this, this.value);
                }
                throw exception;
            }
        }
    } else {
        busConnection.bus.stopWriting(this);
        busConnection.bus.unregisterReader(this);
        busConnection.state = desiredState;
        for (i = 0; i < this.buses.length; i++) {
            if (!angular.equals(this.buses[i], busConnection) && this.buses[i].state == -1) {
                this.setValue(this.buses[i].bus.registerReaderAndRead(this));
            }
        }
    }
};

Register.prototype.isReader = function () {
    var isReading = false;
    for (var i = 0; i < this.buses.length; i++) {
        if (this.buses[i].state === -1) {
            isReading = true;
        }
    }
    return isReading;
};