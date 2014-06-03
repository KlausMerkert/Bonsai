'use strict';

function Bus () {
    this.connections = [];
}

Bus.prototype.enroll = function (enrollee, callback) {
    this.connections.push({
        enrollee: enrollee,
        is_reading: false,
        callback: callback
    });
};