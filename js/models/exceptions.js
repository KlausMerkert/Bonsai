function BusOccupiedException (message, busName, occupyerName) {
    var exception = {};
    exception.name = 'BusOccupiedException';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = busName;
    exception.actor2 = occupyerName;
    return exception;
}

function NotEnrolledReadException (message, tryerName, busName) {
    var exception = {};
    exception.name = 'NotEnrolledReadException';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = tryerName;
    exception.actor2 = busName;
    return exception;
}

function NotEnrolledWriteException (message, tryerName, busName) {
    var exception = {};
    exception.name = 'NotEnrolledWriteException';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = tryerName;
    exception.actor2 = busName;
    return exception;
}

function RegisterIsAlreadyReadingException (message, tryerName) {
    var exception = {};
    exception.name = 'RegisterIsAlreadyReadingException';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = tryerName;
    exception.actor2 = "";
    return exception;
}

function ControlWireNoWriterSpecifiedException (message, wireName) {
    var exception = {};
    exception.name = 'ControlWireNoWriterSpecifiedException';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = wireName;
    exception.actor2 = "";
    return exception;
}

function ControlWireWrongWriterException (message, writerName, wireName) {
    var exception = {};
    exception.name = 'ControlWireWrongWriterException';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = writerName;
    exception.actor2 = wireName;
    return exception;
}