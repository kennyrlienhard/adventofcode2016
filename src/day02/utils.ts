import { getData } from '../data';

export type Direction = 'U' | 'D' | 'R' | 'L';

export async function loadData(trainingData = false): Promise<Direction[][]> {
  const data = await getData(2, trainingData);
  return data.map((line) => line.split('')) as Direction[][];
}
