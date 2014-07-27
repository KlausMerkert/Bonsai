'use strict';

function BitRegister(updateViewCallback, name, initialValue) {
    this.updateViewCallback = updateViewCallback;
    this.name = name;
    this.value = initialValue;
    this.wires = [];
    /* 1 means the BitRegister writes to the wideBus and reads from the wires
     * 0 means the connection to the wideBus is inactive and values from the wires are read
     * -1 means the register reads from the wideBus and writes to the wires */
    this.state = 0;
    this.wideBusConnection = undefined;
}

BitRegister.prototype.setName = function (name) {
    this.name = name;
};

BitRegister.prototype.getName = function () {
    return this.name;
};

BitRegister.prototype.setWideBusConnection = function (bus, writeWire, readWire) {
    this.wideBusConnection = {
        bus: bus,
        writeWire: writeWire,
        readWire: readWire
    };
};

BitRegister.prototype.getWideBusConnection = function () {
    return this.wideBusConnection;
};

BitRegister.prototype.addWireConnection = function (wire, connector) {
    this.wires.push({
        wire: wire,
        connector: connector
    });
};

BitRegister.prototype.removeWireConnection = function (wire) {
    var i = 0;
    while (i < this.wires.length) {
        if (this.wires[i].wire === wire) {
            this.wires.splice(i, 1);
        } else {
            i++;
        }
    }
};

BitRegister.prototype.getWires = function () {
    return this.wires;
};

BitRegister.prototype.setValue = function (value) {
    this.value = value;
    this.updateViewCallback(this.value);
    if (this.state === 1) {
        this.wideBusConnection.bus.write(this, value);
    }
};

BitRegister.prototype.getValue = function () {
    return this.value;
};

BitRegister.prototype.setState = function (desiredState) {
    var readState = this.wideBusConnection.bus.isReader(this);
    var writeState = this.wideBusConnection.bus.isWriter(this);
    if (desiredState == 1) {
        this.wideBusConnection.bus.unregisterReader(this);
        try {
            this.wideBusConnection.bus.write(this, this.getValue());
            this.state = desiredState;
        } catch (exception) {
            if (readState) {
                this.wideBusConnection.bus.registerReaderAndRead(this);
            }
            throw exception;
        }
    } else if (desiredState == -1) {
        this.wideBusConnection.bus.stopWriting(this);
        try {
            this.setValue(this.wideBusConnection.bus.registerReaderAndRead(this));
            this.state = desiredState;
        } catch (exception) {
            if (writeState) {
                this.wideBusConnection.bus.write(this, this.value);
            }
            throw exception;
        }
    } else {
        this.wideBusConnection.bus.stopWriting(this);
        this.wideBusConnection.bus.unregisterReader(this);
        this.state = desiredState;
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
    return (this.state === -1);
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