import { getData } from '../data';

export async function loadData(trainingData = false): Promise<[number, number][]> {
  const parseInput = (input: string) => {
    const [start, end] = input.split('-');
    return [parseInt(start, 10), parseInt(end, 10)] as [number, number];
  };

  return (await getData(20, trainingData)).map(parseInput);
}
