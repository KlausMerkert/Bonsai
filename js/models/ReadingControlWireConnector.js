'use strict';

function ReadingControlWireConnector (controlWire, activatedCallback, deactivatedCallback, name) {
    this.controlWire = controlWire;
    this.activatedCallback = activatedCallback;
    this.deactivatedCallback = deactivatedCallback;
    this.name = name;
    if (!this.name) {
        this.name = 'unnamed connector';
    }
}

ReadingControlWireConnector.prototype.setValue = function (value) {
    if (value) {
        this.activatedCallback(this.controlWire);
    } else {
        this.deactivatedCallback(this.controlWire);
    }
};

ReadingControlWireConnector.prototype.getName = function () {
    return this.name;
};

