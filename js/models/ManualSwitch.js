'use strict';

function ManualSwitch (updateViewCallback, wire, value) {
    this.updateViewCallback = updateViewCallback;
    this.wire = wire;
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
        this.setValue(1);
    } else {
        this.setValue(0);
    }
};

ManualSwitch.prototype.setValue = function (value) {
    if (this.value != value) {
        var writeState = this.wire.isWriter(this);
        try {
            this.wire.write(this, value);
            this.value = value;
            if (!this.value) {
                this.wire.stopWriting(this);
            }
            this.updateViewCallback(this.value);
        } catch (exception) {
            if (!writeState) {
                this.wire.stopWriting(this);
            }
            throw exception;
        }
    }
};