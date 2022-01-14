import { getData } from '../data';

export enum Tile {
  Safe = '.',
  Trap = '^',
}

export async function loadData(trainingData = false): Promise<Tile[][]> {
  const parseInput = (input: string) => input.split('') as Tile[];

  return (await getData(18, trainingData)).map(parseInput);
}
