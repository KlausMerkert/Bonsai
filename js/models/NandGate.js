'use strict';

function NandGate (inWireA, inWireB, outWire) {
    this.inWireA = inWireA;
    this.inWireB = inWireB;
    this.outWire = outWire;
    this.name = "unnamed NAND";
}

NandGate.prototype.getName = function () {
    return this.name;
};

NandGate.prototype.setName = function (name) {
    this.name = name;
};

NandGate.prototype.setValue = function () {
    var stateInA = false;
    if ((this.inWireA) && (this.inWireA.isActive()) && (this.inWireA.isNotZero())) {
        stateInA = true;
    }
    var stateInB = false;
    if ((this.inWireB) && (this.inWireB.isActive()) && (this.inWireB.isNotZero())) {
        stateInB = true;
    }
    if (!(stateInA && stateInB)) {
        if (this.outWire) {
            this.outWire.write(this, 1);
        }
    } else {
        if (this.outWire) {
            this.outWire.write(this, 0);
        }
    }
};