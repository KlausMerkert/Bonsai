'use strict';

function Clock (updateViewCallback, wire, frequency) {
    this.updateViewCallback = updateViewCallback;
    this.wire = wire;
    this.value = 0;
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
};

Clock.prototype.toggle = function () {
    if (!this.value) {
        this.setValue(1);
    } else {
        this.setValue(0);
    }
};

Clock.prototype.setValue = function (value) {
    if (this.value != value) {
        this.value = value;
        try {
            this.wire.write(this, this.value);
        } catch (exception) {
            throw exception;
        } finally {
            if (!this.value) {
                this.wire.stopWriting(this);
            }
            this.updateViewCallback(this.value);
        }
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
    this.isRunning = true;
    var myself = this;
    setTimeout(function () {
        myself.doTick();
    }, Math.floor(1000/this.frequency));
};

Clock.prototype.stop = function () {
    this.isRunning = false;
};