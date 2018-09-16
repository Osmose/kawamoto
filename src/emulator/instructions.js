const instructions = {
  0x00: noop,
};

function noop() {
  return {
    name: 'NOP',
    args: 0,
    cycles: 4,
    callback() {}
  };
}

export default instructions;
