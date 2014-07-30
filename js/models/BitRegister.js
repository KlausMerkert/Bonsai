'use strict';

function BitRegister(updateViewCallback, name, initialValue, stateChangeCallback) {
    this.updateViewCallback = updateViewCallback;
    this.name = name;
    this.value = initialValue;
    this.wires = [];
    /* 1 means the BitRegister writes to the wideBus and reads from the wires
     * 0 means the connection to the wideBus is inactive and values from the wires are read
     * -1 means the register reads from the wideBus and writes to the wires */
    this.state = 0;
    this.wideBusConnection = undefined;
    this.stateChangeCallback = stateChangeCallback;
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
    if (isNaN(parseInt(value))) {
        value = 0;
    }
    this.value = value;
    if (this.state === 1) {
        this.wideBusConnection.bus.write(this, value);
    }
    this.updateViewCallback(this.value);
};

BitRegister.prototype.getValue = function () {
    return this.value;
};

BitRegister.prototype.setBit = function (index, bit) {
    if (!((bit === 0) || (bit === 1))) {
        throw WrongValueForSingleBit(
            this.getName() + ": " + bit + " is not a valid value for a single bit. Only 0 or 1 are allowed.",
            this.getName(),
            bit
        );
    }
    if (bit !== this.getBit(index)) {
        if (bit) {
            this.setValue(this.value + Math.pow(2, index));
        } else {
            this.setValue(this.value - Math.pow(2, index));
        }
    }
};

BitRegister.prototype.getBit = function (index) {
    var number = this.value;
    var digit;
    var binary_list = [];
    while (number > 0) {
        digit = number % 2;
        number = Math.floor(number / 2);
        binary_list.push(digit); // The binary number is reversed in this array.
    }
    if (index < binary_list.length) {
        return binary_list[index];
    } else {
        return 0;
    }
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
    if (this.stateChangeCallback) {
        this.stateChangeCallback(this.state);
    }
};

BitRegister.prototype.setToRead = function (wire) {
    if (this.wideBusConnection.readWire === wire) {
        this.setState(-1);
    }
};

BitRegister.prototype.setToWrite = function (wire) {
    if (this.wideBusConnection.writeWire === wire) {
        this.setState(1);
    }
};

BitRegister.prototype.setToDisconnected = function (wire) {
    if (this.wideBusConnection.writeWire === wire) {
        if ((this.wideBusConnection.readWire) &&
            (this.wideBusConnection.readWire.isActive()) &&
            (this.wideBusConnection.readWire.isNotZero())) {
            this.setState(-1)
        } else {
            this.setState(0);
        }
    }
    if (this.wideBusConnection.readWire === wire) {
        if ((this.wideBusConnection.writeWire) &&
            (this.wideBusConnection.writeWire.isActive()) &&
            (this.wideBusConnection.writeWire.isNotZero())) {
            this.setState(1);
        } else {
            this.setState(0);
        }
    }
};

BitRegister.prototype.isReader = function () {
    return (this.state === -1);
};