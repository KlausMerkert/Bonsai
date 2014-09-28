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

function AddressBusConnectionCanNotBeSetToWrite (message, memoryName, busName) {
    var exception = {};
    exception.name = 'AddressBusConnectionCanNotBeSetToWrite';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = memoryName;
    exception.actor2 = busName;
    return exception;
}

function NoAdressBusConnected (message, memoryName) {
    var exception = {};
    exception.name = 'NoAdressBusConnected';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = memoryName;
    exception.actor2 = "";
    return exception;
}

function InactiveAdressBusConnection (message, memoryName) {
    var exception = {};
    exception.name = 'InactiveAdressBusConnection';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = memoryName;
    exception.actor2 = "";
    return exception;
}

function SuppliedMaxValueIsNotANumber (message, component, value) {
    var exception = {};
    exception.name = 'SuppliedMaxValueIsNotANumber';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = component;
    exception.actor2 = value;
    return exception;
}

function SuppliedValueIsNotANumber (message, component, value) {
    var exception = {};
    exception.name = 'SuppliedValueIsNotANumber';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = component;
    exception.actor2 = value;
    return exception;
}

function SuppliedValueIsNegative (message, component, value) {
    var exception = {};
    exception.name = 'SuppliedValueIsNegative';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = component;
    exception.actor2 = value;
    return exception;
}

function SuppliedValueIsTooBig (message, component, value) {
    var exception = {};
    exception.name = 'SuppliedValueIsTooBig';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = component;
    exception.actor2 = value;
    return exception;
}

function BusNotFound (message, id) {
    var exception = {};
    exception.name = 'BusNotFound';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = id;
    exception.actor2 = "";
    return exception;
}

function WrongValueForSingleBit (message, component, value) {
    var exception = {};
    exception.name = 'WrongValueForSingleBit';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = component;
    exception.actor2 = value;
    return exception;
}

function DelayValueNotAnInteger (message, value) {
    var exception = {};
    exception.name = 'DelayValueNotAnInteger';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = value;
    exception.actor2 = "";
    return exception;
}

function DelayAlreadyOccupied (message, delayName, busName) {
    var exception = {};
    exception.name = 'DelayAlreadyOccupied';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = delayName;
    exception.actor2 = busName;
    return exception;
}

function GateIsAlreadyWriting (message, componentName, busName) {
    var exception = {};
    exception.name = 'GateIsAlreadyWriting';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = componentName;
    exception.actor2 = busName;
    return exception;
}

function GateIsAlreadyReading (message, componentName, busName) {
    var exception = {};
    exception.name = 'GateIsAlreadyReading';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = componentName;
    exception.actor2 = busName;
    return exception;
}

function RegisterIsReadingAndCantAcceptValueChanges (message, RegisterName) {
    var exception = {};
    exception.name = 'RegisterIsReadingAndCantAcceptValueChanges';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = RegisterName;
    exception.actor2 = "";
    return exception;
}

function WriteToUndefinedAddress (message, MemoryName, BusName) {
    var exception = {};
    exception.name = 'WriteToUndefinedAddress';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = MemoryName;
    exception.actor2 = BusName;
    return exception;
}

function ValueIsMaxNoInc (message, componentName, value) {
    var exception = {};
    exception.name = 'ValueIsMaxNoInc';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = componentName;
    exception.actor2 = value;
    return exception;
}

function ZeroValueNoDec (message, componentName, value) {
    var exception = {};
    exception.name = 'ZeroValueNoDec';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = componentName;
    exception.actor2 = value;
    return exception;
}

function ValueNotInRangeZeroToMax (message, componentName, maxValue) {
    var exception = {};
    exception.name = 'ValueNotInRangeZeroToMax';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = componentName;
    exception.actor2 = maxValue;
    return exception;
}