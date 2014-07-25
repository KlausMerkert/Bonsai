'use strict';

function CompareToZero (bus, wire) {
    this.bus = bus;
    this.wire = wire;
    this.name = "unnamed CompareToZero";
}

CompareToZero.prototype.getName = function () {
    return this.name;
};

CompareToZero.prototype.setName = function (name) {
    this.name = name;
};

CompareToZero.prototype.setValue = function () {
    if (parseInt(this.bus.registerReaderAndRead(this)) === 0) {
        if (this.wire) {
            this.wire.write(this, 1);
        }
    } else {
        if (this.wire) {
            this.wire.write(this, 0);
        }
    }
};