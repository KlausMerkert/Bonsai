'use strict';

function FAGate (inWireA, inWireB, inWireC, outWireS, outWireUe) {
    this.inWireA = inWireA;
    this.inWireB = inWireB;
    this.inWireC = inWireC;
    this.outWireS = outWireS;
    this.outWireUe = outWireUe;
    this.name = "unnamed FA";
}

FAGate.prototype.getName = function () {
    return this.name;
};

FAGate.prototype.setName = function (name) {
    this.name = name;
};

FAGate.prototype.setValue = function () {
    var stateInA = false;
    if ((this.inWireA) && (this.inWireA.isActive()) && (this.inWireA.isNotZero())) {
        stateInA = true;
    }
    var stateInB = false;
    if ((this.inWireB) && (this.inWireB.isActive()) && (this.inWireB.isNotZero())) {
        stateInB = true;
    }
    var stateInC = false;
    if ((this.inWireC) && (this.inWireC.isActive()) && (this.inWireC.isNotZero())) {
        stateInC = true;
    }
    if ( !(!(stateInA === stateInB) === stateInC) ) {
        if (this.outWireS) {
            this.outWireS.write(this, 1);
        }
    } else {
        if (this.outWireS) {
            this.outWireS.write(this, 0);
        }
    };
    if ( stateInC && ( (stateInA && !stateInB)||(!stateInA && stateInB) ) || (stateInA && stateInB) ) {
        if (this.outWireUe) {
            this.outWireUe.write(this, 1);
        }
    } else {
        if (this.outWireUe) {
            this.outWireUe.write(this, 0);
        }
    };
};