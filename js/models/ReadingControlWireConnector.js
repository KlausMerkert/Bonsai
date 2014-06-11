'use strict';

function ReadingControlWireConnector (controlWire, activatedCallback, deactivatedCallback) {
    this.controlWire = controlWire;
    this.activatedCallback = activatedCallback;
    this.deactivatedCallback = deactivatedCallback;
}

ReadingControlWireConnector.prototype.setValue = function (value) {
    if (value) {
        this.activatedCallback(this.controlWire);
    } else {
        this.deactivatedCallback(this.controlWire);
    }
};

