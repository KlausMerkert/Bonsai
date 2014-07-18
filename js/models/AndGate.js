'use strict';

function AndGate (inWireA, inWireB, outWire) {
    this.inWireA = inWireA;
    this.inWireB = inWireB;
    this.outWire = outWire;
    this.outWire.setWriter(this);
    this.name = "unnamed AND";
}

AndGate.prototype.getName = function () {
    return this.name;
};

AndGate.prototype.setName = function (name) {
    this.name = name;
};

AndGate.prototype.setValue = function () {
    if ((this.inWireA.isActive()) && (this.inWireB.isActive())) {
        this.outWire.write(this, 1);
    } else {
        this.outWire.write(this, 0);
    }
};