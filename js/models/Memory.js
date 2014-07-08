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

Memory.prototype.getAdressBus = function () {
    return this.address.bus;
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

Memory.prototype.getDataBus = function () {
    return this.data.bus;
};

Memory.prototype.getDataWithContext = function (address) {
    return [
        {'address': undefined, 'value': undefined},
        {'address': undefined, 'value': undefined},
        {'address': address, 'value': this.content[address]},
        {'address': undefined, 'value': undefined},
        {'address': undefined, 'value': undefined}
    ];
};

Memory.prototype.writeData = function (data) {
    if (this.address) {
        if (this.address.state == -1) {
            var address = this.address.bus.registerReaderAndRead(this);
            this.content[address] = data;
            this.dataChangeCallback(this.getDataWithContext(address));
        } else {
            throw InactiveAdressBusConnection(
                "Memory " + this.name + ": The address bus connection is not set to reading. " +
                    "This connection needs to be set to reading to get an address from the address bus " +
                    "which specifies where to write or read.",
                this.name
            )
        }
    } else {
        throw NoAdressBusConnected(
            "Memory " + this.name + ": No address bus connected. " +
                "You have to specify an address which specifies where to write or read the data.",
            this.name
        );
    }
};

Memory.prototype.readData = function () {
    if (this.address) {
        if (this.address.state == -1) {
            var address = this.address.bus.registerReaderAndRead(this);
            return this.content[address];
        } else {
            throw InactiveAdressBusConnection(
                "Memory " + this.name + ": The address bus connection is not set to reading. " +
                    "This connection needs to be set to reading to get an address from the address bus " +
                    "which specifies where to write or read.",
                this.name
            )
        }
    } else {
        throw NoAdressBusConnected(
            "Memory " + this.name + ": No address bus connected. " +
                "You have to specify an address which specifies where to write or read the data.",
            this.name
        );
    }
};

Memory.prototype.setAdressBusState = function (desiredState) {
    if (desiredState == 1) {
        throw AddressBusConnectionCanNotBeSetToWrite(
            "Memory " + this.name + "It does not make sense to write to an address bus (" +
                this.address.bus.name + ").",
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

Memory.prototype.setToRead = function (wire) {
    if (this.address.readWire === wire) {
        this.setState(this.address, -1);
    }
    if (this.data.readWire === wire) {
        this.setState(this.data, -1);
    }
};

Memory.prototype.setToWrite = function (wire) {
    if (this.data.writeWire === wire) {
        this.setState(this.data, 1);
    }
};

Memory.prototype.setToDisconnected = function (wire) {
    if (this.address.readWire === wire) {
        this.setState(this.address, 0);
    }
    if (this.data.readWire === wire) {
        if ((this.data) && (this.data.writeWire) && (this.data.writeWire.isActive())) {
            this.setState(this.data, 1)
        } else {
            this.setState(this.data, 0);
        }
    }
    if (this.data.writeWire === wire) {
        if ((this.data) && (this.data.readWire) && (this.data.readWire.isActive())) {
            this.setState(this.data, -1)
        } else {
            this.setState(this.data, 0);
        }
    }
};