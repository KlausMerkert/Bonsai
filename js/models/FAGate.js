'use strict';

function FAGate (inWireA, inWireB, inWireC, outWireS, outWireUe) {
    this.inWireA = inWireA;
    this.inWireB = inWireB;
    this.inWireC = inWireC;
    this.outWireS = outWireS;
    this.outWireUe = outWireUe;
    this.name = "unnamed FA";
}

HAGate.prototype.getName = function () {
    return this.name;
};

HAGate.prototype.setName = function (name) {
    this.name = name;
};

HAGate.prototype.setValue = function () {
    var stateInA = false;
    if ((this.inWireA) && (this.inWireA.isActive()) && (this.inWireA.isNotZero())) {
        stateInA = true;
    }
    var stateInB = false;
    if ((this.inWireB) && (this.inWireB.isActive()) && (this.inWireB.isNotZero())) {
        stateInB = true;
    }
    if (stateInA && stateInB) {
        if (this.outWireUe) {
            this.outWireUe.write(this, 1);
        }
    } else {
        if (this.outWireUe) {
            this.outWireUe.write(this, 0);
        }
    };
    if ((stateInA && !stateInB) || (!stateInA && stateInB)) {
        if (this.outWireS) {
            this.outWireS.write(this, 1);
        }
    } else {
        if (this.outWireS) {
            this.outWireS.write(this, 0);
        }
    };
};