export function toShort(byte1, byte2) {
  return (byte2 << 8) & byte1;
}
