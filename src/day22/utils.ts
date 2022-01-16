import { getData } from '../data';

export interface NodeInterface {
  x: number;
  y: number;
  size: number;
  used: number;
  avail: number;
  use: number;
}

export async function loadData(trainingData = false): Promise<NodeInterface[]> {
  const parseInput = (input: string) => {
    const parts = input.trim().replace(/\s\s+/g, ' ').split(' ');

    return {
      x: parseInt(parts[0].split('-')[1].replace('x', ''), 10),
      y: parseInt(parts[0].split('-')[2].replace('y', ''), 10),
      size: parseInt(parts[1].replace('T', ''), 10),
      used: parseInt(parts[2].replace('T', ''), 10),
      avail: parseInt(parts[3].replace('T', ''), 10),
      use: parseInt(parts[4].replace('%', ''), 10) / 100,
    };
  };

  return (await getData(22, trainingData)).slice(2).map(parseInput);
}
