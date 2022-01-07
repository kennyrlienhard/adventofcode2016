import { getData } from '../data';

export interface CmdInterface {
  cmd: string;
  x: number;
  y: number;
}

export async function loadData(trainingData = false): Promise<{ cmd: string; x: number; y: number }[]> {
  const parseInput = (input: string) => {
    if (input.includes('rect')) {
      const [x, y] = input.replace('rect', '').trim().split('x');
      return { cmd: 'rect', x: parseInt(x, 10), y: parseInt(y, 10) };
    }

    if (input.includes('rotate')) {
      const [x, y] = Array.from([...input.matchAll(/\d+/g)], (m) => parseInt(m[0], 10));
      const direction = input.split(' ')[1];
      return { cmd: `rotate ${direction}`, x: direction === 'column' ? x : y, y: direction === 'column' ? y : x };
    }

    return null;
  };

  return (await getData(8, trainingData)).map(parseInput);
}
