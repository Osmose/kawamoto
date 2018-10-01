import {toShort} from 'kawamoto/emulator/utils';

function shortArg(emulator) {
  return emulator.memory.getUShort(emulator.cpu.PC.incr(2));
}

function byteArg(emulator) {
  return emulator.memory.getUByte(emulator.cpu.PC.incr(1));
}

const instructions = {
  // Noop
  0x00: noop,

  // Jumps
  0xC2: ifFlag('NZ', jump),
  0xC3: jump,
  0xCA: ifFlag('Z', jump),
  0xD2: ifFlag('NC', jump),
  0xDA: ifFlag('C', jump),

};

function noop() {
  return {
    name: 'NOP',
    args: [],
    cycles: 4,
    callback() {}
  };
}

function jump(emulator) {
  return {
    name: 'JUMP',
    args: [shortArg],
    cycles: 12,
    callback(addr) {
      emulator.cpu.PC.setUShort(addr);
    }
  }
}

function ifFlag(flag, instructionFactory) {
  return emulator => {
    const instruction = instructionFactory(emulator);
    return {
      ...instruction,
      callback(...args) {
        if (emulator.cpu[flag].getFlag()) {
          instruction.callback(...args);
        }
      }
    }
  }
}

export default instructions;
