import { ActionInterface, Command, loadData } from './utils';

interface RegisterInterface {
  a: number;
  b: number;
  c: number;
  d: number;
}

function isNumeric(value: string) {
  return /^-?\d+$/.test(value);
}

function getNumber(value: string, registers: { [key: string]: number }): number {
  return isNumeric(value) ? parseInt(value as string, 10) : registers[value];
}

function handleAction(registers: RegisterInterface, action: ActionInterface) {
  if (action.cmd === Command.Increase) return registers[action.x] + 1;
  if (action.cmd === Command.Decrease) return registers[action.x] - 1;
  return 0;
}

function toggleAction(action: ActionInterface) {
  if ([Command.Decrease, Command.Toggle].includes(action.cmd)) {
    return { ...action, cmd: Command.Increase };
  }

  if (Command.Increase === action.cmd) {
    return { ...action, cmd: Command.Decrease };
  }

  return { ...action, cmd: action.cmd === Command.Jump ? Command.Copy : Command.Jump };
}

async function runActions(input: RegisterInterface) {
  const instructions = await loadData();
  let index = 0;

  const registers = { ...input };

  do {
    const action = instructions[index];

    if (action.cmd === Command.Jump) {
      const source = getNumber(action.x, registers);
      if (source === 0) index += 1;
      else index += getNumber(action.y, registers);
    } else if (action.cmd === Command.Toggle) {
      const indexToToggl = index + getNumber(action.x, registers);

      if (indexToToggl >= 0 && indexToToggl < instructions.length) {
        instructions[indexToToggl] = toggleAction(instructions[indexToToggl]);
      }

      index += 1;
    } else if (action.cmd === Command.Copy) {
      if (!isNumeric(action.y)) registers[action.y] = getNumber(action.x, registers);
      index += 1;
    } else {
      registers[action.x] = handleAction(registers, action);
      index += 1;
    }
  } while (index < instructions.length);

  return registers;
}

async function partA() {
  const registers = await runActions({ a: 7, b: 0, c: 0, d: 0 });
  return registers.a;
}

async function partB() {
  const registers = await runActions({ a: 12, b: 0, c: 0, d: 0 });
  return registers.a;
}

export async function startTwentythree() {
  return Promise.all([partA, partB].map((puzzle) => puzzle()));
}
