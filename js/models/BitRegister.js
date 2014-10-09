'use strict';

function BitRegister(updateViewCallback, name, initialValue, wideBusStateChangeCallback, bitWidth) {
    this.updateViewCallback = updateViewCallback;
    this.name = name;
    this.value = initialValue;
    this.wires = [];
    this.wideBusConnection = undefined;
    this.bitWiresConnection = {
        wires: [],
        state: 0
    };
    this.wideBusStateChangeCallback = wideBusStateChangeCallback;
    if (bitWidth) {
        this.bitWidth = bitWidth;
    } else {
        this.bitWidth = 0;
    }
}

BitRegister.prototype.setName = function (name) {
    this.name = name;
};

BitRegister.prototype.getName = function () {
    return this.name;
};

BitRegister.prototype.setWideBusConnection = function (bus, writeWire, readWire) {
    /* state 1 means the BitRegister writes to the wideBus
     * state 0 means the connection to the wideBus is inactive
     * state -1 means the register reads from the wideBus */
    this.wideBusConnection = {
        bus: bus,
        writeWire: writeWire,
        readWire: readWire,
        state: 0
    };
};

BitRegister.prototype.getWideBusConnection = function () {
    return this.wideBusConnection;
};

BitRegister.prototype.setBitWidth = function (newWidth) {
    if (newWidth) {
        this.bitWidth = newWidth;
    } else {
        this.bitWidth = 0;
    }
};

BitRegister.prototype.addWireConnection = function (wire, connector) {
    if (this.bitWiresConnection.wires.length < this.bitWidth) {
        var connection = {
            wire: wire,
            connector: connector
        };
        this.bitWiresConnection.wires.push(connection);
        return connection;
    } else {
        return false;
    }
};

BitRegister.prototype.removeWireConnection = function (wire) {
    var i = 0;
    while (i < this.bitWiresConnection.wires.length) {
        if (this.bitWiresConnection.wires[i].wire === wire) {
            this.bitWiresConnection.wires.splice(i, 1);
        } else {
            i++;
        }
    }
};

BitRegister.prototype.setBitConnectionControlWires = function (readWire, writeWire) {
    this.bitWiresConnection.readWire = readWire;
    this.bitWiresConnection.writeWire = writeWire;
};

BitRegister.prototype.getWires = function () {
    var bitConnections = [];
    for (var i = 0; i < this.bitWiresConnection.wires.length; i++) {
        bitConnections.push(this.bitWiresConnection.wires[i]);
    }
    for (i = bitConnections.length; i < this.bitWidth; i++) {
        bitConnections.push({
            wire: undefined,
            connector: undefined
        });
    }
    return bitConnections;
};

BitRegister.prototype.setValue = function (value) {
    if (isNaN(parseInt(value))) {
        value = 0;
    }
    this.value = value;
    if (this.wideBusConnection.state === 1) {
        this.wideBusConnection.bus.write(this, value);
    }
    if (this.bitWiresConnection.state == 1) {
        for (var i = 0; i < this.bitWiresConnection.wires.length; i++) {
            this.bitWiresConnection.wires[i].wire.write(
                this.bitWiresConnection.wires[i].connector,
                this.getBit(i)
            );
        }
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
    if ((this.bitWiresConnection.state == 1) &&
        (index < this.bitWiresConnection.wires.length) &&
        (this.bitWiresConnection.wires[index].wire)) {
        this.bitWiresConnection.wires[index].wire.write(
            this.bitWiresConnection.wires[index].connector,
            bit
        );
    }
    if ((index < this.bitWidth) && (bit !== this.getBit(index))) {
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

BitRegister.prototype.setWideBusState = function (desiredState) {
    var readState = this.wideBusConnection.bus.isReader(this);
    var writeState = this.wideBusConnection.bus.isWriter(this);
    if (desiredState == 1) {
        this.wideBusConnection.bus.unregisterReader(this);
        try {
            this.wideBusConnection.bus.write(this, this.getValue());
            this.wideBusConnection.state = 1;
            if (this.wideBusStateChangeCallback) {
                this.wideBusStateChangeCallback(1);
            }
        } catch (exception) {
            if (readState) {
                this.wideBusConnection.bus.registerReaderAndRead(this);
            }
            throw exception;
        }
    } else if ((desiredState == -1) && (this.wideBusConnection.state >= 0)) {
        if (this.bitWiresConnection.state == -1) {
            throw RegisterIsAlreadyReadingException(
                "BitRegister " + this.name + " is already reading.",
                this.name
            )
        } else {
            this.wideBusConnection.bus.stopWriting(this);
            try {
                var busValue = this.wideBusConnection.bus.registerReaderAndRead(this);
                this.wideBusConnection.bus.unregisterReader(this);
                this.setValue(busValue);
                this.wideBusConnection.state = 0;
                if (this.wideBusStateChangeCallback) {
                    this.wideBusStateChangeCallback(-1);
                }
            } catch (exception) {
                if (writeState) {
                    this.wideBusConnection.bus.write(this, this.value);
                }
                throw exception;
            }
        }
    } else {
        this.wideBusConnection.bus.stopWriting(this);
        this.wideBusConnection.bus.unregisterReader(this);
        this.wideBusConnection.state = 0;
        if (this.wideBusStateChangeCallback) {
            this.wideBusStateChangeCallback(0);
        }
    }
};

BitRegister.prototype.setBitConnectionState = function (desiredState) {
    var i;
    var readStates = [];
    var writeStates = [];
    if (desiredState == 1) {
        for (i = 0; i < this.bitWiresConnection.wires.length; i++) {
            readStates.push(
                this.bitWiresConnection.wires[i].wire.isReader(this.bitWiresConnection.wires[i].connector)
            );
            this.bitWiresConnection.wires[i].wire.unregisterReader(this.bitWiresConnection.wires[i].connector);
        }
        try {
            for (i = 0; i < this.bitWiresConnection.wires.length; i++) {
                this.bitWiresConnection.wires[i].wire.write(
                    this.bitWiresConnection.wires[i].connector,
                    this.getBit(i)
                );
            }
            this.bitWiresConnection.state = desiredState;
        } catch (exception) {
            for (i = 0; i < this.bitWiresConnection.wires.length; i++) {
                if (readStates[i]) {
                    this.bitWiresConnection.wires[i].wire.registerReaderAndRead(
                        this.bitWiresConnection.wires[i].connector
                    );
                }
            }
            throw exception;
        }
    } else if (desiredState == -1) {
        if (this.wideBusConnection.state == -1) {
            throw RegisterIsAlreadyReadingException(
                "BitRegister " + this.name + " is already reading.",
                this.name
            )
        } else {
            for (i = 0; i < this.bitWiresConnection.wires.length; i++) {
                writeStates.push(
                    this.bitWiresConnection.wires[i].wire.isWriter(this.bitWiresConnection.wires[i].connector)
                );
                if (writeStates[i]) {
                    this.bitWiresConnection.wires[i].wire.write(this.bitWiresConnection.wires[i].connector, 0);
                }
                this.bitWiresConnection.wires[i].wire.stopWriting(this.bitWiresConnection.wires[i].connector);
            }
            try {
                for (i = 0; i < this.bitWiresConnection.wires.length; i++) {
                    var busValue = this.bitWiresConnection.wires[i].wire.registerReaderAndRead(
                        this.bitWiresConnection.wires[i].connector
                    );
                    if (!busValue) {
                        busValue = 0;
                    }
                    this.setBit(i, busValue);
                }
                this.bitWiresConnection.state = desiredState;
            } catch (exception) {
                for (i = 0; i < this.bitWiresConnection.wires.length; i++) {
                    if (writeStates[i]) {
                        this.bitWiresConnection.wires[i].wire.write(
                            this.bitWiresConnection.wires[i].connector,
                            this.getBit(i)
                        );
                    }
                }
                throw exception;
            }
        }
    } else {
        for (i = 0; i < this.bitWiresConnection.wires.length; i++) {
            if (this.bitWiresConnection.wires[i].wire.isWriter(this.bitWiresConnection.wires[i].connector)) {
                this.bitWiresConnection.wires[i].wire.write(this.bitWiresConnection.wires[i].connector, 0);
            }
            this.bitWiresConnection.wires[i].wire.stopWriting(this.bitWiresConnection.wires[i].connector);
            this.bitWiresConnection.wires[i].wire.unregisterReader(this.bitWiresConnection.wires[i].connector);
        }
        this.bitWiresConnection.state = desiredState;
    }
};

BitRegister.prototype.setBitGateToRead = function () {
    if ((this.bitWiresConnection.writeWire) &&
        (this.bitWiresConnection.writeWire.isActive()) &&
        (this.bitWiresConnection.writeWire.isNotZero())) {
        var bitWireNames = [];
        for (var i = 0; i < this.bitWiresConnection.wires.length; i++) {
            bitWireNames.push(this.bitWiresConnection.wires[i].wire.getName());
        }
        throw GateIsAlreadyWriting(
            this.getName() + ": The gate to the attached Bit Wires (" + bitWireNames.join(', ') +
                ") is already writing and therefore can not be set to read.",
            this.getName(),
            "attached Bit Wires (" + bitWireNames.join(', ') + ")"
        )
    } else {
        this.setBitConnectionState(-1);
    }
};

BitRegister.prototype.setBitGateToWrite = function () {
    if ((this.bitWiresConnection.readWire) &&
        (this.bitWiresConnection.readWire.isActive()) &&
        (this.bitWiresConnection.readWire.isNotZero())) {
        var bitWireNames = [];
        for (var i = 0; i < this.bitWiresConnection.wires.length; i++) {
            bitWireNames.push(this.bitWiresConnection.wires[i].wire.getName());
        }
        throw GateIsAlreadyReading(
            this.getName() + ": The gate to the attached Bit Wires (" + bitWireNames.join(', ') +
                ") is already reading and therefore can not be set to write.",
            this.getName(),
            "attached Bit Wires (" + bitWireNames.join(', ') + ")"
        )
    } else {
        this.setBitConnectionState(1);
    }
};

BitRegister.prototype.setBitGateToDisconnected = function () {
    this.setBitConnectionState(0);
};

BitRegister.prototype.setWideBusGateToRead = function () {
    if ((this.wideBusConnection.writeWire) &&
        (this.wideBusConnection.writeWire.isActive()) &&
        (this.wideBusConnection.writeWire.isNotZero())) {
        throw GateIsAlreadyWriting(
            this.getName() + ": The gate to bus " + this.wideBusConnection.bus.getName() +
                " is already writing and therefore can not be set to read.",
            this.getName(),
            this.wideBusConnection.bus.getName()
        )
    } else {
        this.setWideBusState(-1);
    }
};

BitRegister.prototype.setWideBusGateToWrite = function () {
    if ((this.wideBusConnection.readWire) &&
        (this.wideBusConnection.readWire.isActive()) &&
        (this.wideBusConnection.readWire.isNotZero())) {
        throw GateIsAlreadyReading(
            this.getName() + ": The gate to bus " + this.wideBusConnection.bus.getName() +
                " is already reading and therefore can not be set to write.",
            this.getName(),
            this.wideBusConnection.bus.getName()
        )
    } else {
        this.setWideBusState(1);
    }
};

BitRegister.prototype.setWideBusGateToDisconnected = function (wire) {
    if (this.wideBusConnection.writeWire === wire) {
        if ((this.wideBusConnection.readWire) &&
            (this.wideBusConnection.readWire.isActive()) &&
            (this.wideBusConnection.readWire.isNotZero())) {
            this.setWideBusState(-1)
        } else {
            this.setWideBusState(0);
        }
    }
    if (this.wideBusConnection.readWire === wire) {
        if ((this.wideBusConnection.writeWire) &&
            (this.wideBusConnection.writeWire.isActive()) &&
            (this.wideBusConnection.writeWire.isNotZero())) {
            this.setWideBusState(1);
        } else {
            this.setWideBusState(0);
        }
    }
};

BitRegister.prototype.isReader = function () {
    return ((this.wideBusConnection.state === -1) || (this.bitWiresConnection.state === -1));
};