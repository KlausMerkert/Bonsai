'use strict';

function Delay (delay) {
    this.value = undefined;
    this.activeBus = undefined;
    this.buses = [];
    this.name = "unnamed delay";
    if (isNaN(parseInt(delay))) {
        this.delay = 1;
    } else {
        this.delay = Math.abs(parseInt(delay));
    }
}

Delay.prototype.getName = function () {
    return this.name;
};

Delay.prototype.setName = function (name) {
    this.name = name;
};

Delay.prototype.setDelay = function (delay) {
    var parsedDelay = parseInt(delay);
    if ((isNaN(parsedDelay)) || (parsedDelay < 0)) {
        throw DelayValueNotAnInteger(
            delay + " is not an integer. For a delay only a positive number of milliseconds is allowed.",
            delay
        );
    }
    this.delay = parsedDelay;
};

Delay.prototype.addBus = function (bus) {
    if (this.buses.indexOf(bus) < 0) {
        this.buses.push(bus);
    }
};

Delay.prototype.removeBus = function (bus) {
    var index = this.buses.indexOf(bus);
    if (index >= 0) {
        this.buses.splice(index, 1);
    }
};

Delay.prototype.setValue = function (value, bus) {
    if (this.activeBus && (this.activeBus !== bus)) {
        throw DelayAlreadyOccupied(
            "This delay (" + this.getName() + ") is already occupied by " + this.activeBus.getName() + ".",
            this.getName(),
            this.activeBus.getName()
        );
    }
    this.activeBus = bus;
    this.value = value;
    var delay = this;
    setTimeout(function () {
        delay.delayCall(value, bus);
    }, this.delay);
};

Delay.prototype.delayCall = function (value, bus) {
    this.delayedActions(value, bus);
};

Delay.prototype.delayedActions = function (value, bus) {
    for (var i = 0; i < this.buses.length; i++) {
        if (this.buses[i] !== bus) {
            try {
                if (typeof value != 'undefined') {
                    this.buses[i].write(this, value);
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

Delay.prototype.getValue = function () {
    return this.value;
};
