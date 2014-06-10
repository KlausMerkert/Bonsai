'use strict';

function Led (updateViewCallback, value) {
    this.updateViewCallback = updateViewCallback;
    this.value = value;
    this.name = "unnamed led";
}

Led.prototype.getName = function () {
    return this.name;
};

Led.prototype.setName = function (name) {
    this.name = name;
};

Led.prototype.setValue = function (value) {
    this.value = value;
    this.updateViewCallback(this.value);
};