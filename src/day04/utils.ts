import { getData } from '../data';

export interface RoomInterface {
  name: string;
  sectorId: number;
  checksum: string;
}

export async function loadData(trainingData = false): Promise<RoomInterface[]> {
  const parseInput = (input: string) => {
    const sectorId = input
      .replace(/\[.*?\]/g, '')
      .split('-')
      .at(-1);

    return {
      name: input.split('-').slice(0, -1).join('-'),
      sectorId: parseInt(sectorId, 10),
      checksum: input.slice(0, -1).split('[').at(-1),
    };
  };

  return (await getData(4, trainingData)).map(parseInput);
}
