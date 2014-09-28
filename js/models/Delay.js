'use strict';

function Delay (delay) {
    this.value = undefined;
    this.leftBus = undefined;
    this.rightBus = undefined;
    this.direction = 'right';
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

Delay.prototype.setLeftBus = function (bus) {
    this.leftBus = bus;
};

Delay.prototype.setRightBus = function (bus) {
    this.rightBus = bus;
};

Delay.prototype.setDirection = function (direction) {
    if (direction == 'left') {
        this.direction = 'left';
    } else {
        this.direction = 'right';
    }
};

Delay.prototype.setValue = function (value, bus) {
    if (((this.direction == 'left') && (this.rightBus === bus)) ||
        ((this.direction != 'left') && (this.leftBus === bus))) {
        this.value = value;
        var delay = this;
        setTimeout(function () {
            delay.delayCall(value, bus);
        }, this.delay);
    }
};

Delay.prototype.delayCall = function (value, bus) {
    this.delayedActions(value, bus);
};

Delay.prototype.delayedActions = function (value, bus) {
    if (this.direction == 'left') {
        if (typeof value != 'undefined') {
            this.leftBus.write(this, value);
        } else {
            this.leftBus.stopWriting(this);
        }
    } else {
        if (typeof value != 'undefined') {
            this.rightBus.write(this, value);
        } else {
            this.rightBus.stopWriting(this);
        }
    }
};

Delay.prototype.getValue = function () {
    return this.value;
};
