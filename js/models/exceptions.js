function BusOccupiedException (message, busNo) {
    var exception = {};
    exception.name = 'BusOccupiedException';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.busNo = busNo;
    return exception;
}

function NotEnrolledReadException (message, tryer) {
    var exception = {};
    exception.name = 'NotEnrolledReadException';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.tryer = tryer;
    return exception;
}

function NotEnrolledWriteException (message, tryer) {
    var exception = {};
    exception.name = 'NotEnrolledWriteException';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.tryer = tryer;
    return exception;
}