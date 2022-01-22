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
  if ([Command.Decrease, Command.Toggle, Command.Out].includes(action.cmd)) {
    return { ...action, cmd: Command.Increase };
  }

  if (Command.Increase === action.cmd) {
    return { ...action, cmd: Command.Decrease };
  }

  return { ...action, cmd: action.cmd === Command.Jump ? Command.Copy : Command.Jump };
}

async function runActions(input: RegisterInterface): Promise<[boolean, RegisterInterface]> {
  const MAX_ATTEMPTS = 100000;

  const instructions = await loadData();

  let index = 0;
  let attempts = 0;

  let lookingFor = 0;

  let signal = '';

  let validSignal = true;

  const registers = { ...input };

  do {
    const action = instructions[index];
    let indexChange = 1;

    if (action.cmd === Command.Jump) {
      const source = getNumber(action.x, registers);
      if (source !== 0) indexChange = getNumber(action.y, registers);
    } else if (action.cmd === Command.Toggle) {
      const indexToToggl = index + getNumber(action.x, registers);

      if (indexToToggl >= 0 && indexToToggl < instructions.length) {
        instructions[indexToToggl] = toggleAction(instructions[indexToToggl]);
      }
    } else if (action.cmd === Command.Copy) {
      if (!isNumeric(action.y)) registers[action.y] = getNumber(action.x, registers);
    } else if (action.cmd === Command.Out) {
      if (getNumber(action.x, registers) === lookingFor) {
        signal = `${signal}${lookingFor}`;
      } else {
        validSignal = false;
      }

      lookingFor = lookingFor === 0 ? 1 : 0;
    } else {
      registers[action.x] = handleAction(registers, action);
    }

    index += indexChange;
    attempts += 1;
  } while (index < instructions.length && attempts < MAX_ATTEMPTS && validSignal);

  return [validSignal, registers];
}

async function partA() {
  let a = 0;
  let foundSignal = false;

  do {
    a += 1;
    const [validSignal] = await runActions({ a, b: 0, c: 0, d: 0 });
    foundSignal = validSignal;
  } while (!foundSignal);

  return a;
}

export async function startTwentyfive() {
  return Promise.all([partA].map((puzzle) => puzzle()));
}
