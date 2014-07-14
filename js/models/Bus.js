'use strict';

function Bus () {
    this.updateViewCallback = undefined;
    this.connections = [];
    this.readers = [];
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

Bus.prototype.getBuses = function () {
    return this.connections;
};

Bus.prototype.setValue = function (value) {
    this.value = value;
    if (this.updateViewCallback) {
        this.updateViewCallback(this.value);
    }
    for (var i = 0; i < this.connections.length; i++) {
        if (this.readers.indexOf(this.connections[i]) >= 0) {
            this.connections[i].setValue(this.value, this);
        }
    }
};

Bus.prototype.enroll = function (enrollee) {
    this.connections.push(enrollee);
    return this.connections[this.connections.length - 1];
};

Bus.prototype.resign = function (resigner) {
    var index = this.connections.indexOf(resigner);
    if (index >= 0) {
        this.connections.splice(index, 1);
    }
};

Bus.prototype.registerReaderAndRead = function (reader) {
    var index = this.connections.indexOf(reader);
    if (index >= 0) {
        this.readers.push(reader);
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
    var index = this.readers.indexOf(reader);
    if (index >= 0) {
        this.readers.splice(index, 1);
    }
};

Bus.prototype.isReader = function (reader) {
    return this.readers.indexOf(reader) >= 0;
};

Bus.prototype.write = function (writer, data) {
    var index = this.connections.indexOf(writer);
    if (index >= 0) {
        if (this.active && this.writerIndex != index) {
            throw BusOccupiedException(
                "This bus (" + this.name + ") is already occupied by " +
                    this.connections[this.writerIndex].getName() + ".",
                this.name,
                this.connections[this.writerIndex].getName()
            );
        } else {
            this.unregisterReader(writer);
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
    var index = this.connections.indexOf(writer);
    if (index >= 0) {
        if (index === this.writerIndex) {
            this.active = false;
            this.writerIndex = -1;
            this.setValue(undefined);
        }
    }
};

Bus.prototype.isWriter = function (writer) {
    var index = this.connections.indexOf(writer);
    if (index >= 0) {
        if (index === this.writerIndex) {
            return true;
        }
    }
    return false;
};