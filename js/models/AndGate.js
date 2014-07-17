'use strict';

function AndGate (outWire, value) {
    this.outWire = outWire;
    this.outWire.setWriter(this);
    this.value = value;
    this.name = "unnamed AND";
}

AndGate.prototype.getName = function () {
    return this.name;
};

AndGate.prototype.setName = function (name) {
    this.name = name;
};

AndGate.prototype.setValue = function (value) {
    this.value = value;
};