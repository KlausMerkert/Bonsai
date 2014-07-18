'use strict';

function NorGate (inWireA, inWireB, outWire) {
    this.inWireA = inWireA;
    this.inWireB = inWireB;
    this.outWire = outWire;
    this.outWire.setWriter(this);
    this.name = "unnamed NOR";
}

NorGate.prototype.getName = function () {
    return this.name;
};

NorGate.prototype.setName = function (name) {
    this.name = name;
};

NorGate.prototype.setValue = function () {
    if ((this.inWireA.isActive()) || (this.inWireB.isActive())) {
        this.outWire.write(this, 0);
    } else {
        this.outWire.write(this, 1);
    }
};