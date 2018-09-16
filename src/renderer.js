import fs from 'fs';

import {remote} from 'electron';
import React from 'react';
import ReactDOM from 'react-dom';

import Emulator from 'kawamoto/emulator';
import EmulatorApp from 'kawamoto/components/EmulatorApp';

const ROM_PATH = remote.getCurrentWindow().ROM_PATH;

fs.readFile(ROM_PATH, (error, romData) => {
  if (error) {
    return console.error(error);
  }

  const emulator = new Emulator(romData);
  emulator.powerOn();
  ReactDOM.render(
    <EmulatorApp emulator={emulator} />,
    document.getElementById('app'),
  );
});
