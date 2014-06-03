'use strict';

function Bus () {
    this.updateViewCallback = undefined;
    this.connections = [];
    this.value = null;
    this.active = false;
    this.writerIndex = -1;
}

Bus.prototype.setUpdateViewCallback = function (callbackFunction) {
    this.updateViewCallback = callbackFunction;
};

Bus.prototype.getConnections = function () {
    return this.connections;
};

Bus.prototype.findInConnections = function (enrollee) {
    var index = -1;
    for (var i = 0; i < this.connections.length; i++) {
        if (this.connections[i].enrollee == enrollee) {
            index = i;
        }
    }
    return index;
};

Bus.prototype.enroll = function (enrollee, callback) {
    this.connections.push({
        enrollee: enrollee,
        is_reading: false,
        callback: callback
    });
    return this.connections[this.connections.length - 1];
};

Bus.prototype.resign = function (resigner) {
    var index = this.findInConnections(resigner);
    if (index >= 0) {
        this.connections.splice(index, 1);
    }
};

Bus.prototype.startReading = function (reader) {
    var index = this.findInConnections(reader);
    if (index >= 0) {
        this.connections[index].is_reading = true;
        return this.value;
    } else {
        throw NotEnrolledReadException(
            reader + " is not enrolled to the bus an can not read.",
            reader
        );
    }
};

Bus.prototype.stopReading = function (reader) {
    var index = this.findInConnections(reader);
    if (index >= 0) {
        this.connections[index].is_reading = false;
    }
};

Bus.prototype.isReading = function (reader) {
    var index = this.findInConnections(reader);
    if (index >= 0) {
        return this.connections[index].is_reading;
    }
    return false;
};

Bus.prototype.write = function (writer, data) {
    var index = this.findInConnections(writer);
    if (index >= 0) {
        if (this.active && this.writerIndex != index) {
            throw BusOccupiedException(
                "This bus is already occupied by enrollee no.: " + this.writerIndex + ".",
                this.writerIndex
            );
        } else {
            this.connections[index].is_reading = false;
            this.writerIndex = index;
            this.active = true;
            if (this.value != data) {
                this.value = data;
                if (this.updateViewCallback) {
                    this.updateViewCallback(this.value);
                }
                for (var i = 0; i < this.connections.length; i++) {
                    if (this.connections[i].is_reading) {
                        this.connections[i].callback(this.value);
                    }
                }
            }
        }
    } else {
        throw NotEnrolledWriteException(
            writer + " is not enrolled to the bus and can not write.",
            writer
        );
    }
};

Bus.prototype.stopWriting = function (writer) {
    var index = this.findInConnections(writer);
    if (index >= 0) {
        if (index === this.writerIndex) {
            this.active = false;
            this.writerIndex = -1;
            this.value = null;
            if (this.updateViewCallback) {
                this.updateViewCallback(this.value);
            }
        }
    }
};

Bus.prototype.isWriting = function (writer) {
    var index = this.findInConnections(writer);
    if (index >= 0) {
        if (index === this.writerIndex) {
            return true;
        }
    }
    return false;
};