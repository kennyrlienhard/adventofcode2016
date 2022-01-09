import { ActionInterface, Command, loadData } from './utils';

interface RegisterInterface {
  a: number;
  b: number;
  c: number;
  d: number;
}

function handleAction(registers: RegisterInterface, action: ActionInterface) {
  if (action.cmd === Command.Copy) return action.copyFromRegister ? registers[action.copy] : action.copy;
  if (action.cmd === Command.Increase) return registers[action.register] + 1;
  if (action.cmd === Command.Decrease) return registers[action.register] - 1;
  return 0;
}

async function runActions(input: RegisterInterface) {
  const data = await loadData();
  let index = 0;

  const registers = { ...input };

  do {
    const action = data[index];

    if (action.cmd === Command.Jump) {
      const source = action.stepsFromRegister ? registers[action.register] : parseInt(action.register, 10);
      if (source === 0) {
        index += 1;
      } else {
        index += action.steps;
      }
    } else {
      registers[action.register] = handleAction(registers, action);
      index += 1;
    }
  } while (index < data.length);

  return registers;
}

async function partA() {
  const registers = await runActions({ a: 0, b: 0, c: 0, d: 0 });
  return registers.a;
}

async function partB() {
  const registers = await runActions({ a: 0, b: 0, c: 1, d: 0 });
  return registers.a;
}

export async function startTwelve() {
  return Promise.all([partA, partB].map((puzzle) => puzzle()));
}
