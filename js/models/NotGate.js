'use strict';

function NotGate (inWireA, outWire) {
    this.inWireA = inWireA;
    this.outWire = outWire;
    this.name = "unnamed NOT";
}

NotGate.prototype.getName = function () {
    return this.name;
};

NotGate.prototype.setName = function (name) {
    this.name = name;
};

NotGate.prototype.setValue = function () {
    var stateInA = false;
    if ((this.inWireA) && (this.inWireA.isActive()) && (this.inWireA.isNotZero())) {
        stateInA = true;
    }
    if (stateInA) {
        if (this.outWire) {
            this.outWire.write(this, 0);
        }
    } else {
        if (this.outWire) {
            this.outWire.write(this, 1);
        }
    }
};