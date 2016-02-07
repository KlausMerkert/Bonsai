'use strict';

function ExorGate (inWireA, inWireB, outWire) {
    this.inWireA = inWireA;
    this.inWireB = inWireB;
    this.outWire = outWire;
    this.name = "unnamed EXOR";
}

ExorGate.prototype.getName = function () {
    return this.name;
};

ExorGate.prototype.setName = function (name) {
    this.name = name;
};

ExorGate.prototype.setValue = function () {
    var stateInA = false;
    if ((this.inWireA) && (this.inWireA.isActive()) && (this.inWireA.isNotZero())) {
        stateInA = true;
    }
    var stateInB = false;
    if ((this.inWireB) && (this.inWireB.isActive()) && (this.inWireB.isNotZero())) {
        stateInB = true;
    }
    if ((stateInA && !stateInB) || (!stateInA && stateInB)) {
        if (this.outWire) {
            this.outWire.write(this, 1);
        }
    } else {
        if (this.outWire) {
            this.outWire.write(this, 0);
        }
    }
};