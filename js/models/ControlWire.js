'use strict';

function ControlWire () {
    this.updateViewCallback = undefined;
    this.readers = [];
    this.value = 0;
    this.writer = undefined;
    this.name = "unnamed Wire";
}

ControlWire.prototype.setUpdateViewCallback = function (callbackFunction) {
    this.updateViewCallback = callbackFunction;
};

ControlWire.prototype.setName = function (name) {
    this.name = name;
};

ControlWire.prototype.getConnections = function () {
    if (this.writer) {
        return this.readers.concat([this.writer]);
    } else {
        throw ControlWireNoWriterSpecifiedException(
            this.name + " has no writer specified. This means the control wire is in an illegal state.",
            this.name
        );
    }
};

ControlWire.prototype.connect = function (connector) {
    this.readers.push(connector);
    return this.readers[this.readers.length - 1];
};

ControlWire.prototype.setWriter = function (writer) {
    this.writer = writer;
    var index = this.readers.indexOf(writer);
    if (index >= 0) {
        this.readers.splice(index, 1);
    }
};

ControlWire.prototype.write = function (writer, value) {
    if ((writer === this.writer) == (this.writer)) {
        this.setValue(value);
        for (var i = 0; i < this.readers.length; i++) {
            this.readers[i].setValue(this.value);
        }
    } else {
        throw ControlWireWrongWriterException(
            "The writer you have given does not match the writer (" + this.writer.getName() +
                ") of this control wire (" + this.name + ").",
            this.writer.getName(),
            this.name
        );
    }
};

ControlWire.prototype.setValue = function (value) {
    if ((value === 0) || (value === 1)) {
        this.value = value;
    }
};