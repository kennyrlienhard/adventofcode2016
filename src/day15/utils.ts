import { getData } from '../data';

export interface DiscInterface {
  disc: number;
  positions: number;
  time: number;
  initialPosition: number;
}

export async function loadData(trainingData = false): Promise<DiscInterface[]> {
  const parseInput = (input: string) => {
    const disc = parseInt(input.split('#')[1].split(' ')[0], 10);
    const positions = parseInt(input.split(' has ')[1].split(' ')[0], 10);
    const time = parseInt(input.split('time=')[1].split(' ')[0], 10);
    const initialPosition = parseInt(input.slice(0, -1).split(' ').at(-1), 0);

    return { disc, positions, time, initialPosition };
  };

  return (await getData(15, trainingData)).map(parseInput);
}
