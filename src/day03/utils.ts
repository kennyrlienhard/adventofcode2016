import { getData } from '../data';

export async function loadData(trainingData = false): Promise<number[][]> {
  const data = await getData(3, trainingData);

  return data.map((line) =>
    line
      .trim()
      .replace(/\s\s+/g, ' ')
      .split(' ')
      .map((length) => parseInt(length, 10))
  );
}
