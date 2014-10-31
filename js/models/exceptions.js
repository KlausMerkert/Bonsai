function BusOccupiedException (thrower, message, busName, occupyerName) {
    var exception = {};
    exception.thrower = thrower;
    exception.name = 'BusOccupiedException';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = busName;
    exception.actor2 = occupyerName;
    return exception;
}

function NotEnrolledReadException (thrower, message, tryerName, busName) {
    var exception = {};
    exception.thrower = thrower;
    exception.name = 'NotEnrolledReadException';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = tryerName;
    exception.actor2 = busName;
    return exception;
}

function NotEnrolledWriteException (thrower, message, tryerName, busName) {
    var exception = {};
    exception.thrower = thrower;
    exception.name = 'NotEnrolledWriteException';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = tryerName;
    exception.actor2 = busName;
    return exception;
}

function RegisterIsAlreadyReadingException (thrower, message, tryerName) {
    var exception = {};
    exception.thrower = thrower;
    exception.name = 'RegisterIsAlreadyReadingException';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = tryerName;
    exception.actor2 = "";
    return exception;
}

function AddressBusConnectionCanNotBeSetToWrite (thrower, message, memoryName, busName) {
    var exception = {};
    exception.thrower = thrower;
    exception.name = 'AddressBusConnectionCanNotBeSetToWrite';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = memoryName;
    exception.actor2 = busName;
    return exception;
}

function NoAdressBusConnected (thrower, message, memoryName) {
    var exception = {};
    exception.thrower = thrower;
    exception.name = 'NoAdressBusConnected';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = memoryName;
    exception.actor2 = "";
    return exception;
}

function InactiveAdressBusConnection (thrower, message, memoryName) {
    var exception = {};
    exception.thrower = thrower;
    exception.name = 'InactiveAdressBusConnection';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = memoryName;
    exception.actor2 = "";
    return exception;
}

function SuppliedMaxValueIsNotANumber (thrower, message, component, value) {
    var exception = {};
    exception.thrower = thrower;
    exception.name = 'SuppliedMaxValueIsNotANumber';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = component;
    exception.actor2 = value;
    return exception;
}

function SuppliedValueIsNotANumber (thrower, message, component, value) {
    var exception = {};
    exception.thrower = thrower;
    exception.name = 'SuppliedValueIsNotANumber';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = component;
    exception.actor2 = value;
    return exception;
}

function SuppliedValueIsNegative (thrower, message, component, value) {
    var exception = {};
    exception.thrower = thrower;
    exception.name = 'SuppliedValueIsNegative';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = component;
    exception.actor2 = value;
    return exception;
}

function SuppliedValueIsTooBig (thrower, message, component, value) {
    var exception = {};
    exception.thrower = thrower;
    exception.name = 'SuppliedValueIsTooBig';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = component;
    exception.actor2 = value;
    return exception;
}

function BusNotFound (thrower, message, id) {
    var exception = {};
    exception.thrower = thrower;
    exception.name = 'BusNotFound';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = id;
    exception.actor2 = "";
    return exception;
}

function WrongValueForSingleBit (thrower, message, component, value) {
    var exception = {};
    exception.thrower = thrower;
    exception.name = 'WrongValueForSingleBit';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = component;
    exception.actor2 = value;
    return exception;
}

function DelayValueNotAnInteger (thrower, message, value) {
    var exception = {};
    exception.thrower = thrower;
    exception.name = 'DelayValueNotAnInteger';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = value;
    exception.actor2 = "";
    return exception;
}

function DelayAlreadyOccupied (thrower, message, delayName, busName) {
    var exception = {};
    exception.thrower = thrower;
    exception.name = 'DelayAlreadyOccupied';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = delayName;
    exception.actor2 = busName;
    return exception;
}

function GateIsAlreadyWriting (thrower, message, componentName, busName) {
    var exception = {};
    exception.thrower = thrower;
    exception.name = 'GateIsAlreadyWriting';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = componentName;
    exception.actor2 = busName;
    return exception;
}

function GateIsAlreadyReading (thrower, message, componentName, busName) {
    var exception = {};
    exception.thrower = thrower;
    exception.name = 'GateIsAlreadyReading';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = componentName;
    exception.actor2 = busName;
    return exception;
}

function RegisterIsReadingAndCantAcceptValueChanges (thrower, message, RegisterName) {
    var exception = {};
    exception.thrower = thrower;
    exception.name = 'RegisterIsReadingAndCantAcceptValueChanges';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = RegisterName;
    exception.actor2 = "";
    return exception;
}

function WriteToUndefinedAddress (thrower, message, MemoryName, BusName) {
    var exception = {};
    exception.thrower = thrower;
    exception.name = 'WriteToUndefinedAddress';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = MemoryName;
    exception.actor2 = BusName;
    return exception;
}

function ValueIsMaxNoInc (thrower, message, componentName, value) {
    var exception = {};
    exception.thrower = thrower;
    exception.name = 'ValueIsMaxNoInc';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = componentName;
    exception.actor2 = value;
    return exception;
}

function ZeroValueNoDec (thrower, message, componentName, value) {
    var exception = {};
    exception.thrower = thrower;
    exception.name = 'ZeroValueNoDec';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = componentName;
    exception.actor2 = value;
    return exception;
}

function ValueNotInRangeZeroToMax (thrower, message, componentName, maxValue) {
    var exception = {};
    exception.thrower = thrower;
    exception.name = 'ValueNotInRangeZeroToMax';
    exception.localization = '_' + exception.name + '_';
    exception.message = message;
    exception.actor1 = componentName;
    exception.actor2 = maxValue;
    return exception;
}