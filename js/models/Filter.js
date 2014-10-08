'use strict';

function Filter (statement) {
    this.value = undefined;
    this.leftBus = undefined;
    this.rightBus = undefined;
    this.name = "unnamed filter";
    this.statement = statement;
    this.direction = 'right';
}

Filter.prototype.getName = function () {
    return this.name;
};

Filter.prototype.setName = function (name) {
    this.name = name;
};

Filter.prototype.setLeftBus = function (bus) {
    this.leftBus = bus;
};

Filter.prototype.setRightBus = function (bus) {
    this.rightBus = bus;
};

Filter.prototype.setStatement = function (statement) {
    this.statement = statement;
    var writeBus = undefined;
    var readBus = undefined;
    if (this.direction == 'left') {
        writeBus = this.leftBus;
        readBus = this.rightBus;
    } else { // this.direction == 'right'
        writeBus = this.rightBus;
        readBus = this.leftBus;
    }
    if (readBus) {
        this.value = this.applyFilter(readBus.registerReaderAndRead(this));
        if (writeBus) {
            if (typeof this.value != 'undefined') {
                writeBus.write(this, this.value);
            } else {
                writeBus.stopWriting(this);
            }
        }
    }
};

Filter.prototype.setDirection = function (direction) {
    if (direction == 'left') {
        this.direction = 'left';
    } else {
        this.direction = 'right';
    }
};

Filter.prototype.applyFilter = function (n) {
    return eval(this.statement);
};

Filter.prototype.setValue = function (value, bus) {
    var writeBus = undefined;
    if (this.direction == 'left') {
        if (this.rightBus === bus) {
            writeBus = this.leftBus;
        }
    } else { // this.direction == 'right'
        if (this.leftBus === bus) {
            writeBus = this.rightBus;
        }
    }
    if (writeBus) {
        this.value = this.applyFilter(value);
        if (typeof value != 'undefined') {
            writeBus.write(this, this.value);
        } else {
            writeBus.stopWriting(this);
        }
    }
};

Filter.prototype.getValue = function () {
    return this.value;
};
