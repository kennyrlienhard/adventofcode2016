import { getData } from '../data';

export async function loadData(trainingData = false): Promise<['L' | 'R', number][]> {
  const [data] = await getData(1, trainingData);
  return data.split(', ').map((step) => [step[0] as 'L' | 'R', parseInt(step.replace(/L|R/, ''), 10)]);
}
