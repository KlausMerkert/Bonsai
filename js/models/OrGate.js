'use strict';

function OrGate (inWireA, inWireB, outWire) {
    this.inWireA = inWireA;
    this.inWireB = inWireB;
    this.outWire = outWire;
    this.outWire.setWriter(this);
    this.name = "unnamed OR";
}

OrGate.prototype.getName = function () {
    return this.name;
};

OrGate.prototype.setName = function (name) {
    this.name = name;
};

OrGate.prototype.setValue = function () {
    if ((this.inWireA.isActive()) || (this.inWireB.isActive())) {
        this.outWire.write(this, 1);
    } else {
        this.outWire.write(this, 0);
    }
};