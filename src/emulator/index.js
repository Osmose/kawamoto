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
    const opcode = this.memory.getUByte(this.cpu.PC.incr());

    const instruction = instructions[opcode];
    if (!instruction) {
      this.emit('instruction_ran', {
        name: `UNRECOGNIZED OPCODE ${opcode.toString(16)}`,
        cycles: 0,
      });
      return;
    }

    const {name, args, cycles, callback} = instruction(this);
    const callbackArgs = args.map(arg => arg(this));
    callback(...callbackArgs);

    this.emit('instruction_ran', {name, cycles, args: callbackArgs});
  }
}
