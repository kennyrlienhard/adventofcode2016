import { getData } from '../data';

export async function loadData(trainingData = false): Promise<{ ip: string[]; hypernet: string[] }[]> {
  const parseInput = (input: string) => {
    const matches = [...input.matchAll(/\[(.*?)\]/g)];
    const ip = input.replace(/\[(.*?)\]/g, '-');
    return { ip: ip.split('-').filter((value) => value), hypernet: Array.from(matches, (m) => m[1]) };
  };

  return (await getData(7, trainingData)).map(parseInput);
}
