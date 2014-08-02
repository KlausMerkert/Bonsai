'use strict';

function Filter (statement) {
    this.value = undefined;
    this.activeBus = undefined;
    this.buses = [];
    this.name = "unnamed filter";
    this.statement = statement;
}

Filter.prototype.getName = function () {
    return this.name;
};

Filter.prototype.setName = function (name) {
    this.name = name;
};

Filter.prototype.addBus = function (bus) {
    if (this.buses.indexOf(bus) < 0) {
        this.buses.push(bus);
    }
};

Filter.prototype.removeBus = function (bus) {
    var index = this.buses.indexOf(bus);
    if (index >= 0) {
        this.buses.splice(index, 1);
    }
};

Filter.prototype.setStatement = function (statement) {
    this.statement = statement;
};

Filter.prototype.applyFilter = function (n) {
    return eval(this.statement);
};

Filter.prototype.setValue = function (value, bus) {
    if (this.activeBus && (this.activeBus !== bus)) {
        throw FilterAlreadyOccupied(
            "This filter (" + this.getName() + ") is already occupied by " + this.activeBus.getName() + ".",
            this.getName(),
            this.activeBus.getName()
        );
    }
    this.activeBus = bus;
    this.value = this.applyFilter(value);
    for (var i = 0; i < this.buses.length; i++) {
        if (this.buses[i] !== this.activeBus) {
            try {
                if (typeof value != 'undefined') {
                    this.buses[i].write(this, this.value);
                } else {
                    this.buses[i].stopWriting(this);
                    this.buses[i].registerReaderAndRead(this);
                    this.activeBus = undefined;
                }
            } catch (exception) {
                this.buses[i].registerReaderAndRead(this);
                this.activeBus = undefined;
                throw exception;
            }
        }
    }
};

Filter.prototype.getValue = function () {
    return this.value;
};
