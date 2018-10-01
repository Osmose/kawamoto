import EventEmitter from 'events';

export default class CPU {
  constructor() {
    // Registers
    this.AF = new ShortRegister();
    this.A = this.AF.highByteRegister();
    this.F = this.AF.lowByteRegister();
    this.BC = new ShortRegister();
    this.B = this.BC.highByteRegister();
    this.C = this.BC.lowByteRegister();
    this.DE = new ShortRegister();
    this.D = this.DE.highByteRegister();
    this.E = this.DE.lowByteRegister();
    this.HL = new ShortRegister();
    this.H = this.HL.highByteRegister();
    this.L = this.HL.lowByteRegister();
    this.SP = new ShortRegister(); // Stack pointer
    this.PC = new ShortRegister(); // Program counter

    // Flags
    this.flags = {
      Z: this.F.flag(7), // Zero
      N: this.F.flag(6), // Subtract
      H: this.F.flag(5), // Half carry
      C: this.F.flag(4), // Carry
    };
  }

  powerOn() {
    this.PC.setUShort(0x100);
    this.SP.setUShort(0xFFFE);
  }
}

class ShortRegister extends EventEmitter {
  constructor() {
    super();
    this.value = Buffer.alloc(2);
  }

  highByteRegister() {
    return new ByteRegister(this.value.slice(0, 1));
  }

  lowByteRegister() {
    return new ByteRegister(this.value.slice(1, 2));
  }

  setUShort(value) {
    this.value.writeUInt16LE(value, 0);
    this.emit('change', value);
  }

  getUShort() {
    return this.value.readUInt16LE(0);
  }

  incr(amount = 1) {
    const value = this.getUShort();
    this.setUShort(value + amount);
    return value;
  }
}

class ByteRegister extends EventEmitter {
  constructor(value = Buffer.alloc(1)) {
    super();
    this.value = value;
  }

  flag(bit) {
    return new Flag(this.value, bit);
  }

  setUByte(value) {
    this.value.writeUInt8(value, 0);
    this.emit('change', value);
  }

  getUByte() {
    return this.value.readUInt8(0);
  }
}

class Flag extends EventEmitter{
  constructor(value, bit) {
    super();
    this.value = value;
    this.bit = bit;
    this.mask = 1 << bit;
  }

  getFlag() {
    return this.value.readUInt8(0) & this.mask;
  }

  setFlag(value) {
    const valueInt = this.value.readUInt8(0);
    if (value) {
      this.value.writeUInt8(valueInt | this.mask);
    } else {
      this.value.writeUInt8(valueInt & ~this.mask);
    }
    this.emit('change', this.get());
  }
}
