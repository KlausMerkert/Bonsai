'use strict';

function Clock (updateViewCallback, wire, frequency) {
    this.updateViewCallback = updateViewCallback;
    this.wire = wire;
    this.value = undefined;
    this.setFrequency(frequency);
    this.name = "unnamed clock generator";
    this.isRunning = false;
}

Clock.prototype.getName = function () {
    return this.name;
};

Clock.prototype.setName = function (name) {
    this.name = name;
};

Clock.prototype.setFrequency = function (newFrequency) {
    if (isNaN(parseInt(newFrequency))) {
        newFrequency = 1;
    }
    this.frequency = Math.abs(parseInt(newFrequency));
    if (!this.frequency) {
        this.frequency = 1;
    }
};

Clock.prototype.toggle = function () {
    if (this.value || !this.isRunning) {
        this.setValue(0);
    } else {
        this.setValue(1);
    }
};

Clock.prototype.setValue = function (value) {
    if (this.value != value) {
        this.wire.write(this, value);
        this.value = value;
        this.updateViewCallback(this.value);
    }
};

Clock.prototype.doTick = function () {
    this.tick();
};

Clock.prototype.tick = function () {
    this.toggle();
    var myself = this;
    if (this.isRunning) {
        setTimeout(function () {
            myself.doTick();
        }, Math.floor(1000/this.frequency));
    }
};

Clock.prototype.start = function () {
    if (!this.isRunning) {
        this.isRunning = true;
        var myself = this;
        setTimeout(function () {
            myself.doTick();
        }, Math.floor(1000 / this.frequency));
    }
};

Clock.prototype.stop = function () {
    this.isRunning = false;
};