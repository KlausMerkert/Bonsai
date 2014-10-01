'use strict';

function Register(updateViewCallback, name, initialValue, incWire, decWire, clrWire) {
    this.updateViewCallback = updateViewCallback;
    this.name = name;
    this.value = initialValue;
    this.buses = [];
    this.incWire = incWire;
    this.decWire = decWire;
    this.clrWire = clrWire;
}

Register.prototype.setName = function (name) {
    this.name = name;
};

Register.prototype.getName = function () {
    return this.name;
};

Register.prototype.setMaxValue = function (maxValue) {
    this.maxValue = maxValue;
};

Register.prototype.addBusConnection = function (bus, writeWire, readWire) {
    /* Connections can have three states:
     * 1 means the register writes to the bus
     * 0 means the connection is inactive
     * -1 means the register reads from the bus */
    var connection = {
        state: 0,
        bus: bus,
        writeWire: writeWire,
        readWire: readWire
    };
    this.buses.push(connection);
    return connection;
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

Register.prototype.getBuses = function () {
    return this.buses;
};

Register.prototype.setValue = function (value) {
    if ((value < 0) || ((typeof this.maxValue != 'undefined') && (value > this.maxValue))) {
        throw ValueNotInRangeZeroToMax(
            this.getName() + ": The value you try to set is not in the Range 0 to " + this.maxValue + ".",
            this.getName(),
            this.maxValue
        )
    } else {
        this.value = value;
        this.updateViewCallback(this.value);
        for (var i = 0; i < this.buses.length; i++) {
            if (this.buses[i].state === 1) {
                this.buses[i].bus.write(this, value);
            }
        }
    }
};

Register.prototype.getValue = function () {
    return this.value;
};

Register.prototype.inc = function () {
    if (this.isReader()) {
        throw RegisterIsReadingAndCantAcceptValueChanges(
            "Register " + this.getName() + " is Reading from a Bus and can not accept value Changes.",
            this.getName()
        );
    }
    if ((typeof this.maxValue == 'undefined') || (this.getValue() < this.maxValue)) {
        this.setValue((parseInt(this.getValue()) + 1));
    } else {
        throw ValueIsMaxNoInc(
            this.getName() + ": The value is " + this.getValue() +
                " which is already the maximum value. Therefore increasing the value is not allowed.",
            this.getName(),
            this.getValue()
        )
    }
};

Register.prototype.dec = function () {
    if (this.isReader()) {
        throw RegisterIsReadingAndCantAcceptValueChanges(
            "Register " + this.getName() + " is Reading from a Bus and can not accept value Changes.",
            this.getName()
        );
    }
    if (this.getValue() > 0) {
        this.setValue((parseInt(this.getValue()) - 1));
    } else {
        throw ZeroValueNoDec(
            this.getName() + ": The value is " + this.getValue() +
                " and must not be negative. So decreasing this value is not allowed.",
            this.getName(),
            this.getValue()
        )
    }
};

Register.prototype.clr = function () {
    if (this.isReader()) {
        throw RegisterIsReadingAndCantAcceptValueChanges(
            "Register " + this.getName() + " is Reading from a Bus and can not accept value Changes.",
            this.getName()
        );
    }
    this.setValue(0);
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

Register.prototype.setToRead = function (bus) {
    for (var i = 0; i < this.buses.length; i++) {
        if (this.buses[i].bus === bus) {
            if ((this.buses[i].writeWire) &&
                (this.buses[i].writeWire.isActive()) &&
                (this.buses[i].writeWire.isNotZero())) {
                throw GateIsAlreadyWriting(
                    this.getName() + ": The gate to bus " + this.buses[i].bus.getName() +
                        " is already writing and therefore can not be set to read.",
                    this.getName(),
                    this.buses[i].bus.getName()
                )
            } else {
                this.setState(this.buses[i], -1);
            }
        }
    }
};

Register.prototype.setToWrite = function (bus) {
    for (var i = 0; i < this.buses.length; i++) {
        if (this.buses[i].bus === bus) {
            if ((this.buses[i].readWire) &&
                (this.buses[i].readWire.isActive()) &&
                (this.buses[i].readWire.isNotZero())) {
                throw GateIsAlreadyReading(
                    this.getName() + ": The gate to bus " + this.buses[i].bus.getName() +
                        " is already reading and therefore can not be set to write.",
                    this.getName(),
                    this.buses[i].bus.getName()
                )
            } else {
                this.setState(this.buses[i], 1);
            }
        }
    }
};

Register.prototype.setWriteToDisconnected = function (bus) {
    for (var i = 0; i < this.buses.length; i++) {
        if (this.buses[i].bus === bus) {
            if ((this.buses[i].readWire) &&
                (this.buses[i].readWire.isActive()) &&
                (this.buses[i].readWire.isNotZero())) {
                this.setState(this.buses[i], -1)
            } else {
                this.setState(this.buses[i], 0);
            }
        }
    }
};

Register.prototype.setReadToDisconnected = function (bus) {
    for (var i = 0; i < this.buses.length; i++) {
        if (this.buses[i].bus === bus) {
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

Register.prototype.isReader = function () {
    var isReading = false;
    for (var i = 0; i < this.buses.length; i++) {
        if (this.buses[i].state === -1) {
            isReading = true;
        }
    }
    return isReading;
};

Register.prototype.getReaders = function () {
    var readers = [];
    for (var i = 0; i < this.buses.length; i++) {
        if (this.buses[i].state === -1) {
            readers.push(this.buses[i].bus)
        }
    }
    return readers;
};