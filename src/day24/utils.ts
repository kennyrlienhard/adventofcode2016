import { getData } from '../data';

export async function loadData(trainingData = false): Promise<string[][]> {
  const parseInput = (input: string) => input.split('');

  return (await getData(24, trainingData)).map(parseInput);
}
