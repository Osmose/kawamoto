export default class Memory {
  constructor(romData) {
    this.rom = new ROM(romData);
  }

  getUByte(address) {
    if (address < 0x4000) {
      return this.rom.getUByte(0, address);
    }

    throw new Error(`Unsupported memory address ${address.toString(16)}`);
  }

}

class ROM {
  constructor(romData) {
    this.romData = romData;
    this.type = romData.readUInt8(0x147);
  }

  getUByte(bank, offset) {
    if (bank !== 0) {
      throw new Error(`Unsupported bank ${bank.toString(16)}`);
    }

    return this.romData.readUInt8(offset);
  }
}
