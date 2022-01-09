import { getData } from '../data';

export enum Command {
  Copy = 'cpy',
  Increase = 'inc',
  Decrease = 'dec',
  Jump = 'jnz',
}

export interface ActionInterface {
  cmd: Command;
  register: string;
  steps?: number;
  stepsFromRegister?: boolean;
  copyFromRegister?: boolean;
  copy?: string | number;
}

export async function loadData(trainingData = false): Promise<ActionInterface[]> {
  const parseInput = (input: string) => {
    const [cmd, a, b] = input.split(' ') as [Command, string, string];

    if ([Command.Increase, Command.Decrease].includes(cmd)) {
      return { cmd, register: a };
    }

    if (cmd === Command.Jump) {
      const stepsFromRegister = !/^-?\d+$/.test(a);
      return { cmd, register: a, stepsFromRegister, steps: parseInt(b, 10) };
    }

    const copyFromRegister = !/^-?\d+$/.test(a);
    return { cmd, register: b, copyFromRegister, copy: copyFromRegister ? a : parseInt(a, 10) };
  };

  return (await getData(12, trainingData)).map(parseInput);
}
