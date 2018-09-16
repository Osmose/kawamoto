import EventEmitter from 'events';

import CPU from 'kawamoto/emulator/cpu';
import Memory from 'kawamoto/emulator/memory';
import instructions from 'kawamoto/emulator/instructions';

export default class Emulator extends EventEmitter {
  constructor(romData) {
    super();
    this.memory = new Memory(romData);
    this.cpu = new CPU();
  }

  powerOn() {
    this.cpu.powerOn();
  }

  cycle() {
    let programCounter = this.cpu.PC.getUShort();
    const opcode = this.memory.getUByte(programCounter);
    programCounter++;

    const instruction = instructions[opcode];
    if (!instruction) {
      this.emit('instruction_ran', {
        name: `UNRECOGNIZED OPCODE ${opcode.toString(16)}`,
        cycles: 0,
      });
      this.cpu.PC.setUShort(programCounter);
      return;
    }

    const {name, args, cycles, callback} = instruction();
    const callbackArgs = [];
    for (let k = 0; k < args; k++) {
      callbackArgs.push(this.memory.getUByte(programCounter));
      programCounter++;
    }
    callback(...callbackArgs);

    this.emit('instruction_ran', {name, cycles});
    this.cpu.PC.setUShort(programCounter);
  }
}
