'use strict';

function ManualSwitch (updateViewCallback, wire, value) {
    this.updateViewCallback = updateViewCallback;
    this.wire = wire;
    this.wire.setWriter(this);
    this.value = value;
    this.name = "unnamed manual switch";
}

ManualSwitch.prototype.getName = function () {
    return this.name;
};

ManualSwitch.prototype.setName = function (name) {
    this.name = name;
};

ManualSwitch.prototype.toggle = function () {
    if (!this.value) {
        this.value = 1;
    } else {
        this.value = 0;
    }
    this.wire.write(this, this.value);
    this.updateViewCallback(this.value);
};

ManualSwitch.prototype.setValue = function (value) {
    if (this.value != value) {
        this.value = value;
        this.updateViewCallback(this.value);
    }
};