import { getData } from '../data';

export enum Command {
  Copy = 'cpy',
  Increase = 'inc',
  Decrease = 'dec',
  Jump = 'jnz',
  Toggle = 'tgl',
}

export interface ActionInterface {
  cmd: Command;
  x: string;
  y?: string;
}

export async function loadData(trainingData = false): Promise<ActionInterface[]> {
  const parseInput = (input: string) => {
    const [cmd, x, y] = input.split(' ') as [Command, string, string];

    if ([Command.Increase, Command.Decrease, Command.Toggle].includes(cmd)) {
      return { cmd, x };
    }

    return { cmd, x, y };
  };

  return (await getData(23, trainingData)).map(parseInput);
}
