'use strict';

function Memory(updateViewCallback, name) {
    this.updateViewCallback = updateViewCallback;
    this.name = name;
    this.content = {};
    this.address = undefined;
    this.data = undefined;
}

Memory.prototype.setName = function (name) {
    this.name = name;
};

Memory.prototype.getName = function () {
    return this.name;
};

Memory.prototype.setAddressBusConnection = function (bus, readWire) {
    /* The address bus connection has only two states:
     * 0 means the connection is inactive
     * -1 means the address is read from the addressBus */
    this.address = {
        state: 0,
        bus: bus,
        //writeWire: undefined,
        readWire: readWire
    };
};

Memory.prototype.setDataBusConnection = function (bus, writeWire, readWire) {
    /* The data bus connection can have three states:
     * 1 means the data is written to the bus
     * 0 means the connection is inactive
     * -1 means the data is read from the bus */
    this.data = {
        state: 0,
        bus: bus,
        writeWire: writeWire,
        readWire: readWire
    };
};

Memory.prototype.setAdressBusState = function (desiredState) {
    if (desiredState == 1) {
        throw AddressBusConnectionCanNotBeSetToWrite(
                "It does not make sense to write to an address bus (" + this.address.bus.name + ").",
            this.address.bus.name
        );
    } else if (desiredState == -1) {
        try {
            this.setValue(this.address.bus.registerReaderAndRead(this));
            this.address.state = desiredState;
        } catch (exception) {
            throw exception;
        }
    } else {
        this.address.bus.unregisterReader(this);
        this.address.state = desiredState;
    }
};

Memory.prototype.setDataBusState = function (desiredState) {
    var wasReading = (this.data.state == -1);
    var wasWriting = (this.data.state == 1);
    if (desiredState == 1) {
        this.data.bus.unregisterReader(this);
        try {
            this.data.bus.write(this, this.getValue());
            this.data.state = desiredState;
        } catch (exception) {
            if (wasReading) {
                this.data.bus.registerReaderAndRead(this);
            }
            throw exception;
        }
    } else if (desiredState == -1) {
        this.data.bus.stopWriting(this);
        try {
            this.setValue(this.data.bus.registerReaderAndRead(this));
            this.data.state = desiredState;
        } catch (exception) {
            if (wasWriting) {
                this.data.bus.write(this, this.value);
            }
            throw exception;
        }
    } else {
        this.data.bus.stopWriting(this);
        this.data.bus.unregisterReader(this);
        this.data.state = desiredState;
    }
};