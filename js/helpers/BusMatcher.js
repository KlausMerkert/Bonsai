'use strict';

function BusMatcher (cpu) {
    this.cpu = cpu;
}

BusMatcher.prototype.getCpu = function () {
    return this.cpu;
};

BusMatcher.prototype.createBuses = function () {
    if (this.cpu.buses) {
        for (var i = 0; i < this.cpu.buses.length; i++) {
            this.cpu.buses[i].object = new Bus();
        }
    }
};

BusMatcher.prototype.findBus = function(id) {
    for (var i = 0; i < this.cpu.buses.length; i++) {
        if (this.cpu.buses[i].id == id) {
            return this.cpu.buses[i].object;
        }
    }
    throw BusNotFound(
        "The bus with id " + id + " was not found.",
        id
    );
};

BusMatcher.prototype.matchManualSwitches = function () {
    if (this.cpu.manualswitches) {
        for (var i = 0; i < this.cpu.manualswitches.length; i++) {
            this.cpu.manualswitches[i].wire = this.findBus(this.cpu.manualswitches[i].wireId);
        }
    }
};

BusMatcher.prototype.matchClocks = function () {
    if (this.cpu.clocks) {
        for (var i = 0; i < this.cpu.clocks.length; i++) {
            if (this.cpu.clocks[i].wireId) {
                this.cpu.clocks[i].wire = this.findBus(this.cpu.clocks[i].wireId);
            }
            if (this.cpu.clocks[i].runWireId) {
                this.cpu.clocks[i].runWire = this.findBus(this.cpu.clocks[i].runWireId);
            }
        }
    }
};

BusMatcher.prototype.matchLeds = function () {
    if (this.cpu.leds) {
        for (var i = 0; i < this.cpu.leds.length; i++) {
            this.cpu.leds[i].wire = this.findBus(this.cpu.leds[i].wireId);
        }
    }
};

BusMatcher.prototype.matchAndGates = function () {
    if (this.cpu.andGates) {
        for (var i = 0; i < this.cpu.andGates.length; i++) {
            if (this.cpu.andGates[i].inAId) {
                this.cpu.andGates[i].inA = this.findBus(this.cpu.andGates[i].inAId);
            }
            if (this.cpu.andGates[i].inBId) {
                this.cpu.andGates[i].inB = this.findBus(this.cpu.andGates[i].inBId);
            }
            if (this.cpu.andGates[i].outId) {
                this.cpu.andGates[i].out = this.findBus(this.cpu.andGates[i].outId);
            }
        }
    }
};

BusMatcher.prototype.matchOrGates = function () {
    if (this.cpu.orGates) {
        for (var i = 0; i < this.cpu.orGates.length; i++) {
            if (this.cpu.orGates[i].inAId) {
                this.cpu.orGates[i].inA = this.findBus(this.cpu.orGates[i].inAId);
            }
            if (this.cpu.orGates[i].inBId) {
                this.cpu.orGates[i].inB = this.findBus(this.cpu.orGates[i].inBId);
            }
            if (this.cpu.orGates[i].outId) {
                this.cpu.orGates[i].out = this.findBus(this.cpu.orGates[i].outId);
            }
        }
    }
};

BusMatcher.prototype.matchNorGates = function () {
    if (this.cpu.norGates) {
        for (var i = 0; i < this.cpu.norGates.length; i++) {
            if (this.cpu.norGates[i].inAId) {
                this.cpu.norGates[i].inA = this.findBus(this.cpu.norGates[i].inAId);
            }
            if (this.cpu.norGates[i].inBId) {
                this.cpu.norGates[i].inB = this.findBus(this.cpu.norGates[i].inBId);
            }
            if (this.cpu.norGates[i].outId) {
                this.cpu.norGates[i].out = this.findBus(this.cpu.norGates[i].outId);
            }
        }
    }
};

BusMatcher.prototype.matchRegisters = function () {
    if (this.cpu.registers) {
        for (var i = 0; i < this.cpu.registers.length; i++) {
            if (this.cpu.registers[i].incWireId) {
                this.cpu.registers[i].incWire = this.findBus(this.cpu.registers[i].incWireId);
            }
            if (this.cpu.registers[i].decWireId) {
                this.cpu.registers[i].decWire = this.findBus(this.cpu.registers[i].decWireId);
            }
            if (this.cpu.registers[i].clrWireId) {
                this.cpu.registers[i].clrWire = this.findBus(this.cpu.registers[i].clrWireId);
            }
            if (this.cpu.registers[i].gates) {
                for (var j = 0; j < this.cpu.registers[i].gates.length; j++) {
                    if (this.cpu.registers[i].gates[j].busId) {
                        this.cpu.registers[i].gates[j].bus = this.findBus(
                            this.cpu.registers[i].gates[j].busId
                        );
                    }
                    if (this.cpu.registers[i].gates[j].writeWireId) {
                        this.cpu.registers[i].gates[j].writeWire = this.findBus(
                            this.cpu.registers[i].gates[j].writeWireId
                        );
                    }
                    if (this.cpu.registers[i].gates[j].readWireId) {
                        this.cpu.registers[i].gates[j].readWire = this.findBus(
                            this.cpu.registers[i].gates[j].readWireId
                        );
                    }
                }
            }
        }
    }
};

BusMatcher.prototype.matchBitRegisters = function () {
    if (this.cpu.bitregisters) {
        for (var i = 0; i < this.cpu.bitregisters.length; i++) {
            if (this.cpu.bitregisters[i].widegate) {
                this.cpu.bitregisters[i].widegate.bus = this.findBus(this.cpu.bitregisters[i].widegate.busId);
                if (this.cpu.bitregisters[i].widegate.writeWireId) {
                    this.cpu.bitregisters[i].widegate.writeWire = this.findBus(
                        this.cpu.bitregisters[i].widegate.writeWireId
                    );
                }
                if (this.cpu.bitregisters[i].widegate.readWireId) {
                    this.cpu.bitregisters[i].widegate.readWire = this.findBus(
                        this.cpu.bitregisters[i].widegate.readWireId
                    );
                }
            }
            if (this.cpu.bitregisters[i].wiresReadWireId) {
                this.cpu.bitregisters[i].wiresReadWire = this.findBus(
                    this.cpu.bitregisters[i].wiresReadWireId
                );
            }
            if (this.cpu.bitregisters[i].wiresWriteWireId) {
                this.cpu.bitregisters[i].wiresWriteWire = this.findBus(
                    this.cpu.bitregisters[i].wiresWriteWireId
                );
            }
            if (this.cpu.bitregisters[i].wiregates) {
                for (var j = 0; j < this.cpu.bitregisters[i].wiregates.length; j++) {
                    if (this.cpu.bitregisters[i].wiregates[j].wireId) {
                        this.cpu.bitregisters[i].wiregates[j].wire = this.findBus(
                            this.cpu.bitregisters[i].wiregates[j].wireId
                        );
                    }
                }
            }
        }
    }
};

BusMatcher.prototype.matchMemories = function () {
    if (this.cpu.memories) {
        for (var i = 0; i < this.cpu.memories.length; i++) {
            if (this.cpu.memories[i].addressgate.busId) {
                this.cpu.memories[i].addressgate.bus = this.findBus(this.cpu.memories[i].addressgate.busId);
            }
            if (this.cpu.memories[i].addressgate.readWireId) {
                this.cpu.memories[i].addressgate.readWire = this.findBus(this.cpu.memories[i].addressgate.readWireId);
            }
            if (this.cpu.memories[i].datagate.busId) {
                this.cpu.memories[i].datagate.bus = this.findBus(this.cpu.memories[i].datagate.busId);
            }
            if (this.cpu.memories[i].datagate.writeWireId) {
                this.cpu.memories[i].datagate.writeWire = this.findBus(this.cpu.memories[i].datagate.writeWireId);
            }
            if (this.cpu.memories[i].datagate.readWireId) {
                this.cpu.memories[i].datagate.readWire = this.findBus(this.cpu.memories[i].datagate.readWireId);
            }
        }
    }
};

BusMatcher.prototype.matchZerocomparators = function () {
    if (this.cpu.zerocomparators) {
        for (var i = 0; i < this.cpu.zerocomparators.length; i++) {
            this.cpu.zerocomparators[i].bus = this.findBus(this.cpu.zerocomparators[i].busId);
            if (this.cpu.zerocomparators[i].wireId) {
                this.cpu.zerocomparators[i].wire = this.findBus(this.cpu.zerocomparators[i].wireId);
            }
        }
    }
};

BusMatcher.prototype.matchDelays = function () {
    if (this.cpu.delays) {
        for (var i = 0; i < this.cpu.delays.length; i++) {
            if (this.cpu.delays[i].busLeftId) {
                this.cpu.delays[i].busLeft = this.findBus(this.cpu.delays[i].busLeftId);
            }
            if (this.cpu.delays[i].busRightId) {
                this.cpu.delays[i].busRight = this.findBus(this.cpu.delays[i].busRightId);
            }
        }
    }
};

BusMatcher.prototype.matchFilters = function () {
    if (this.cpu.filters) {
        for (var i = 0; i < this.cpu.filters.length; i++) {
            if (this.cpu.filters[i].busLeftId) {
                this.cpu.filters[i].busLeft = this.findBus(this.cpu.filters[i].busLeftId);
            }
            if (this.cpu.filters[i].busRightId) {
                this.cpu.filters[i].busRight = this.findBus(this.cpu.filters[i].busRightId);
            }
        }
    }
};

BusMatcher.prototype.matchDigiSwitches = function () {
    if (this.cpu.digiSwitches) {
        for (var i = 0; i < this.cpu.digiSwitches.length; i++) {
            this.cpu.digiSwitches[i].wire = this.findBus(this.cpu.digiSwitches[i].wireId);
        }
    }
};

BusMatcher.prototype.matchDigiAndGates = function () {
    if (this.cpu.digiAndGates) {
        for (var i = 0; i < this.cpu.digiAndGates.length; i++) {
            if (this.cpu.digiAndGates[i].inAId) {
                this.cpu.digiAndGates[i].inA = this.findBus(this.cpu.digiAndGates[i].inAId);
            }
            if (this.cpu.digiAndGates[i].inBId) {
                this.cpu.digiAndGates[i].inB = this.findBus(this.cpu.digiAndGates[i].inBId);
            }
            if (this.cpu.digiAndGates[i].outId) {
                this.cpu.digiAndGates[i].out = this.findBus(this.cpu.digiAndGates[i].outId);
            }
        }
    }
};

BusMatcher.prototype.matchDigiOrGates = function () {
    if (this.cpu.digiOrGates) {
        for (var i = 0; i < this.cpu.digiOrGates.length; i++) {
            if (this.cpu.digiOrGates[i].inAId) {
                this.cpu.digiOrGates[i].inA = this.findBus(this.cpu.digiOrGates[i].inAId);
            }
            if (this.cpu.digiOrGates[i].inBId) {
                this.cpu.digiOrGates[i].inB = this.findBus(this.cpu.digiOrGates[i].inBId);
            }
            if (this.cpu.digiOrGates[i].outId) {
                this.cpu.digiOrGates[i].out = this.findBus(this.cpu.digiOrGates[i].outId);
            }
        }
    }
};

BusMatcher.prototype.matchAllComponents = function () {
    this.matchManualSwitches();
    this.matchClocks();
    this.matchLeds();
    this.matchAndGates();
    this.matchOrGates();
    this.matchNorGates();
    this.matchRegisters();
    this.matchBitRegisters();
    this.matchMemories();
    this.matchZerocomparators();
    this.matchDelays();
    this.matchFilters();
    this.matchDigiSwitches();
    this.matchDigiAndGates();
    this.matchDigiOrGates();
};

