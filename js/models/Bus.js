'use strict';

function Bus () {
    this.updateViewCallback = undefined;
    this.connections = [];
    this.value = undefined;
    this.active = false;
    this.writerIndex = -1;
    this.name = "unnamed Bus";
}

Bus.prototype.setUpdateViewCallback = function (callbackFunction) {
    this.updateViewCallback = callbackFunction;
};

Bus.prototype.setName = function (name) {
    this.name = name;
};

Bus.prototype.getConnections = function () {
    return this.connections;
};

Bus.prototype.setValue = function (value) {
    this.value = value;
    if (this.updateViewCallback) {
        this.updateViewCallback(this.value);
    }
    for (var i = 0; i < this.connections.length; i++) {
        if (this.connections[i].is_reading) {
            this.connections[i].callback(this.value);
        }
    }
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

Bus.prototype.registerReaderAndRead = function (reader) {
    var index = this.findInConnections(reader);
    if (index >= 0) {
        this.connections[index].is_reading = true;
        return this.value;
    } else {
        throw NotEnrolledReadException(
            reader.getName() + " is not enrolled to this bus (" + this.name + ") and can not read.",
            reader.getName(),
            this.name
        );
    }
};

Bus.prototype.unregisterReader = function (reader) {
    var index = this.findInConnections(reader);
    if (index >= 0) {
        this.connections[index].is_reading = false;
    }
};

Bus.prototype.isReader = function (reader) {
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
                "This bus (" + this.name + ") is already occupied by " +
                    this.connections[this.writerIndex].enrollee.getName() + ".",
                this.name,
                this.connections[this.writerIndex].enrollee.getName()
            );
        } else {
            this.connections[index].is_reading = false;
            this.writerIndex = index;
            this.active = true;
            if (this.value != data) {
                this.setValue(data);
            }
        }
    } else {
        throw NotEnrolledWriteException(
            writer.getName() + " is not enrolled to the bus (" + this.name + ") and can not write.",
            writer.getName(),
            this.name
        );
    }
};

Bus.prototype.stopWriting = function (writer) {
    var index = this.findInConnections(writer);
    if (index >= 0) {
        if (index === this.writerIndex) {
            this.active = false;
            this.writerIndex = -1;
            this.setValue(undefined);
        }
    }
};

Bus.prototype.isWriter = function (writer) {
    var index = this.findInConnections(writer);
    if (index >= 0) {
        if (index === this.writerIndex) {
            return true;
        }
    }
    return false;
};