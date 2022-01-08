import { getData } from '../data';

export enum Action {
  GoesTo = 'goesTo',
  GivesTo = 'givesTo',
}

export interface ActionInterface {
  cmd: string;
  actor: string;
  value?: number;
  low?: string;
  high?: string;
}

export async function loadData(trainingData = false): Promise<ActionInterface[]> {
  const parseInput = (input: string) => {
    if (input.includes('goes to bot')) {
      const [value, bot] = Array.from([...input.matchAll(/\d+/g)], (m) => parseInt(m[0], 10));
      return { cmd: Action.GoesTo, actor: `bot ${bot}`, value };
    }

    const bot = input.match(/((bot|output) \d+)/)[0];

    const low = input
      .split(' gives low to ')
      .at(1)
      .match(/((bot|output) \d+)/);

    const high = input.split(' high to ').at(1);

    return { cmd: Action.GivesTo, actor: bot, low: low[0], high };
  };

  return (await getData(10, trainingData)).map(parseInput);
}
