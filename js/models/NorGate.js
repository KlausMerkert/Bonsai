'use strict';

function NorGate (inWireA, inWireB, outWire) {
    this.inWireA = inWireA;
    this.inWireB = inWireB;
    this.outWire = outWire;
    this.name = "unnamed NOR";
}

NorGate.prototype.getName = function () {
    return this.name;
};

NorGate.prototype.setName = function (name) {
    this.name = name;
};

NorGate.prototype.setValue = function () {
    var stateInA = false;
    if ((this.inWireA) && (this.inWireA.isActive()) && (this.inWireA.isNotZero())) {
        stateInA = true;
    }
    var stateInB = false;
    if ((this.inWireB) && (this.inWireB.isActive()) && (this.inWireB.isNotZero())) {
        stateInB = true;
    }
    if (!(stateInA || stateInB)) {
        if (this.outWire) {
            this.outWire.write(this, 1);
        }
    } else {
        if (this.outWire) {
            this.outWire.write(this, 0);
        }
    }
};