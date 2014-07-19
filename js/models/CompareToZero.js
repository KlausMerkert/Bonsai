'use strict';

function CompareToZero (bus, wire) {
    this.bus = bus;
    this.wire = wire;
    this.wire.setWriter(this);
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
        this.wire.write(this, 1);
    } else {
        this.wire.write(this, 0);
    }
};