'use strict';

function BitRegister(updateViewCallback, name, initialValue) {
    this.updateViewCallback = updateViewCallback;
    this.name = name;
    this.value = initialValue;
    this.buses = [];
}

BitRegister.prototype.setName = function (name) {
    this.name = name;
};

BitRegister.prototype.getName = function () {
    return this.name;
};

BitRegister.prototype.addBusConnection = function (bus, writeWire, readWire) {
    /* Connections can have three states:
     * 1 means the register writes to the bus
     * 0 means the connection is inactive
     * -1 means the register reads from the bus */
    this.buses.push({
        state: 0,
        bus: bus,
        writeWire: writeWire,
        readWire: readWire
    });
};

BitRegister.prototype.removeConnection = function (bus) {
    var i = 0;
    while (i < this.buses.length) {
        if (this.buses[i].bus === bus) {
            this.buses.splice(i, 1);
        } else {
            i++;
        }
    }
};

BitRegister.prototype.getBuses = function () {
    return this.buses;
};

BitRegister.prototype.setValue = function (value) {
    this.value = value;
    this.updateViewCallback(this.value);
    for (var i = 0; i < this.buses.length; i++) {
        if (this.buses[i].state === 1) {
            this.buses[i].bus.write(this, value);
        }
    }
};

BitRegister.prototype.getValue = function () {
    return this.value;
};

BitRegister.prototype.setState = function (busConnection, desiredState) {
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
        if ((this.isReader()) && ((this.getReaders().length > 1) || (this.getReaders()[0] != busConnection.bus))) {
            throw RegisterIsAlreadyReadingException(
                "Register " + this.name + " is already reading.",
                this.name
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

BitRegister.prototype.setToRead = function (wire) {
    for (var i = 0; i < this.buses.length; i++) {
        if (this.buses[i].readWire === wire) {
            this.setState(this.buses[i], -1);
        }
    }
};

BitRegister.prototype.setToWrite = function (wire) {
    for (var i = 0; i < this.buses.length; i++) {
        if (this.buses[i].writeWire === wire) {
            this.setState(this.buses[i], 1);
        }
    }
};

BitRegister.prototype.setToDisconnected = function (wire) {
    for (var i = 0; i < this.buses.length; i++) {
        if (this.buses[i].writeWire === wire) {
            if ((this.buses[i].readWire) &&
                (this.buses[i].readWire.isActive()) &&
                (this.buses[i].readWire.isNotZero())) {
                this.setState(this.buses[i], -1)
            } else {
                this.setState(this.buses[i], 0);
            }
        }
        if (this.buses[i].readWire === wire) {
            if ((this.buses[i].writeWire) &&
                (this.buses[i].writeWire.isActive()) &&
                (this.buses[i].writeWire.isNotZero())) {
                this.setState(this.buses[i], 1);
            } else {
                this.setState(this.buses[i], 0);
            }
        }
    }
};

BitRegister.prototype.isReader = function () {
    var isReading = false;
    for (var i = 0; i < this.buses.length; i++) {
        if (this.buses[i].state === -1) {
            isReading = true;
        }
    }
    return isReading;
};

BitRegister.prototype.getReaders = function () {
    var readers = [];
    for (var i = 0; i < this.buses.length; i++) {
        if (this.buses[i].state === -1) {
            readers.push(this.buses[i].bus)
        }
    }
    return readers;
};