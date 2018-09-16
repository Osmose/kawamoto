import autobind from 'autobind-decorator';
import React from 'react';

@autobind
export default class EmulatorApp extends React.Component {
  handleClickStep() {
    this.props.emulator.cycle();
  }

  render() {
    const {emulator} = this.props;
    return (
      <>
        <RegisterDisplay emulator={emulator} />
        <InstructionLog emulator={emulator} />
        <button onClick={this.handleClickStep}>Step</button>
      </>
    );
  }
}

class RegisterDisplay extends React.Component {
  render() {
    const {emulator} = this.props;
    return (
      <div>
        <ByteRegister name="A" register={emulator.cpu.A} />
        <ByteRegister name="F" register={emulator.cpu.F} />
        <ByteRegister name="B" register={emulator.cpu.B} />
        <ByteRegister name="C" register={emulator.cpu.C} />
        <ByteRegister name="D" register={emulator.cpu.D} />
        <ByteRegister name="E" register={emulator.cpu.E} />
        <ByteRegister name="H" register={emulator.cpu.H} />
        <ByteRegister name="L" register={emulator.cpu.L} />
        <ShortRegister name="SP" register={emulator.cpu.SP} />
        <ShortRegister name="PC" register={emulator.cpu.PC} />
      </div>
    )
  }
}

@autobind
class ByteRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.register.getUByte(),
    };
  }

  componentDidMount() {
    this.props.register.on('change', this.handleRegisterChange);
  }

  handleRegisterChange(newValue) {
    this.setState({value: newValue});
  }

  render() {
    const {name} = this.props;
    const {value} = this.state;
    return (
      <div>
        <strong>{name}</strong>
        {value.toString(16)}
      </div>
    );
  }
}

@autobind
class ShortRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.register.getUShort(),
    };
  }

  componentDidMount() {
    this.props.register.on('change', this.handleRegisterChange);
  }

  handleRegisterChange(newValue) {
    this.setState({value: newValue});
  }

  render() {
    const {name} = this.props;
    const {value} = this.state;
    return (
      <div>
        <strong>{name}</strong>
        {value.toString(16)}
      </div>
    );
  }
}

class InstructionLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructionLogs: [],
    };
  }

  componentDidMount() {
    this.props.emulator.on('instruction_ran', instructionLog => {
      this.setState(state => ({
        instructionLogs: state.instructionLogs.concat([instructionLog]),
      }));
    });
  }

  render() {
    const {instructionLogs} = this.state;
    return (
      <ul>
        {instructionLogs.map((instructionLog, index) => (
          <li key={index}>
            {instructionLog.name} ({instructionLog.cycles})
          </li>
        ))}
      </ul>
    )
  }
}
