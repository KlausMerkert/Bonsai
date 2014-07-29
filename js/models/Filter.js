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

Filter.prototype.setValue = function (value, bus) {
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

Filter.prototype.getValue = function () {
    return this.value;
};
