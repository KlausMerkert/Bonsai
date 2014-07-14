'use strict';

function Memory(updateViewCallback, name) {
    this.updateViewCallback = updateViewCallback;
    this.name = name;
    this.content = {};
    this.addressBus = undefined;
    this.dataBus = undefined;
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
    this.addressBus = {
        state: 0,
        bus: bus,
        readWire: readWire
    };
};

Memory.prototype.getAdressBus = function () {
    return this.addressBus.bus;
};

Memory.prototype.setDataBusConnection = function (bus, writeWire, readWire) {
    /* The data bus connection can have three states:
     * 1 means the data is written to the bus
     * 0 means the connection is inactive
     * -1 means the data is read from the bus */
    this.dataBus = {
        state: 0,
        bus: bus,
        writeWire: writeWire,
        readWire: readWire
    };
};

Memory.prototype.getDataWithContext = function (address) {
    var context = [
        {"address": undefined, 'value': undefined},
        {"address": undefined, 'value': undefined},
        {"address": undefined, 'value': undefined},
        {"address": undefined, 'value': undefined},
        {"address": undefined, 'value': undefined}
    ];
    var keys = Object.keys(this.content);
    var prevPrev = undefined;
    var prev = undefined;
    for (var i = 0; i < keys.length; i++) {
        if (keys[i] == address) {
            context[0].address = prevPrev;
            context[0].value = this.content[prevPrev];
            context[1].address = prev;
            context[1].value = this.content[prev];
            context[2].address = keys[i];
            context[2].value = this.content[keys[i]];
            if (i + 1 < keys.length) {
                context[3].address = keys[i + 1];
                context[3].value = this.content[keys[i + 1]];
            }
            if (i + 2 < keys.length) {
                context[4].address = keys[i + 2];
                context[4].value = this.content[keys[i + 2]];
            }
        }
        prevPrev = prev;
        prev = keys[i];
    }
    return context;
};

Memory.prototype.writeData = function (data) {
    if (this.addressBus) {
        if (this.addressBus.state == -1) {
            var address = this.addressBus.bus.registerReaderAndRead(this);
            this.content[address] = data;
            this.updateViewCallback(this.getDataWithContext(address));
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

Memory.prototype.setValue = Memory.prototype.writeData;

Memory.prototype.readData = function () {
    if (this.addressBus) {
        if (this.addressBus.state == -1) {
            var address = this.addressBus.bus.registerReaderAndRead(this);
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

Memory.prototype.getAddressBus = function () {
    return this.addressBus.bus;
};

Memory.prototype.getAddressBusState = function () {
    return this.addressBus.state;
};

Memory.prototype.setAddressBusState = function (desiredState) {
    if (desiredState == 1) {
        throw AddressBusConnectionCanNotBeSetToWrite(
            "Memory " + this.name + "It does not make sense to write to an address bus (" +
                this.addressBus.bus.name + ").",
            this.addressBus.bus.name
        );
    } else if (desiredState == -1) {
        try {
            var address = this.addressBus.bus.registerReaderAndRead(this);
            this.addressBus.state = desiredState;
            return address;
        } catch (exception) {
            throw exception;
        }
    } else {
        this.addressBus.bus.unregisterReader(this);
        this.addressBus.state = desiredState;
        return undefined;
    }
};

Memory.prototype.getDataBus = function () {
    return this.dataBus.bus;
};

Memory.prototype.getDataBusState = function () {
    return this.dataBus.state;
};

Memory.prototype.setDataBusState = function (desiredState) {
    var wasReading = (this.dataBus.state == -1);
    var wasWriting = (this.dataBus.state == 1);
    var address;
    if (desiredState == 1) {
        if (this.addressBus.state == -1) {
            address = this.addressBus.bus.registerReaderAndRead(this);
            this.dataBus.bus.unregisterReader(this);
            try {
                this.dataBus.bus.write(this, this.content[address]);
                this.dataBus.state = desiredState;
            } catch (exception) {
                if (wasReading) {
                    this.dataBus.bus.registerReaderAndRead(this);
                }
                throw exception;
            }
            this.updateViewCallback(this.getDataWithContext(address));
        } else {
            throw InactiveAdressBusConnection(
                    "Memory " + this.name + ": The address bus connection is not set to reading. " +
                    "This connection needs to be set to reading to get an address from the address bus " +
                    "which specifies where to write or read.",
                this.name
            );
        }
    } else if (desiredState == -1) {
        if (this.addressBus.state == -1) {
            address = this.addressBus.bus.registerReaderAndRead(this);
            this.dataBus.bus.stopWriting(this);
            try {
                this.content[address] = this.dataBus.bus.registerReaderAndRead(this);
                this.dataBus.state = desiredState;
            } catch (exception) {
                if (wasWriting) {
                    this.dataBus.bus.write(this, this.value);
                }
                throw exception;
            }
        } else {
            throw InactiveAdressBusConnection(
                    "Memory " + this.name + ": The address bus connection is not set to reading. " +
                    "This connection needs to be set to reading to get an address from the address bus " +
                    "which specifies where to write or read.",
                this.name
            );
        }
    } else {
        this.dataBus.bus.stopWriting(this);
        this.dataBus.bus.unregisterReader(this);
        this.dataBus.state = desiredState;
    }
};

Memory.prototype.setToRead = function (wire) {
    if (this.addressBus.readWire === wire) {
        this.setState(this.addressBus, -1);
    }
    if (this.dataBus.readWire === wire) {
        this.setState(this.dataBus, -1);
    }
};

Memory.prototype.setToWrite = function (wire) {
    if (this.dataBus.writeWire === wire) {
        this.setState(this.dataBus, 1);
    }
};

Memory.prototype.setToDisconnected = function (wire) {
    if (this.addressBus.readWire === wire) {
        this.setState(this.addressBus, 0);
    }
    if (this.dataBus.readWire === wire) {
        if ((this.dataBus) && (this.dataBus.writeWire) && (this.dataBus.writeWire.isActive())) {
            this.setState(this.dataBus, 1)
        } else {
            this.setState(this.dataBus, 0);
        }
    }
    if (this.dataBus.writeWire === wire) {
        if ((this.dataBus) && (this.dataBus.readWire) && (this.dataBus.readWire.isActive())) {
            this.setState(this.dataBus, -1)
        } else {
            this.setState(this.dataBus, 0);
        }
    }
};