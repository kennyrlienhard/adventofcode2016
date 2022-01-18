import PF from 'pathfinding';

import { loadData } from './utils';

function isNumeric(value: string) {
  return /^-?\d+$/.test(value);
}

function printArea(area: string[][]) {
  area.forEach((row) => {
    console.log(row.join(''));
  });
  console.log();
}

function getVisits(area: string[][]): [number, number, number][] {
  const result = [];

  for (let y = 0; y < area.length; y++) {
    for (let x = 0; x < area[0].length; x++) {
      if (isNumeric(area[y][x])) result.push([x, y, parseInt(area[y][x], 10)]);
    }
  }

  return result;
}

function permute(permutation: number[]) {
  const result = [[...permutation]];
  const c = new Array(permutation.length).fill(0);

  let i = 1;
  let k = 0;
  let p = 0;

  while (i < permutation.length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push([...permutation]);
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}

function calculateDistance(matrix: number[][], visitOrder: number[], visits: [number, number, number][]) {
  let result = 0;

  for (let i = 0; i < visitOrder.length - 1; i += 1) {
    const location1 = visitOrder[i];
    const location2 = visitOrder[i + 1];

    const [x1, y1] = visits.find((v) => v.at(-1) === location1);
    const [x2, y2] = visits.find((v) => v.at(-1) === location2);

    const finder = new PF.AStarFinder();

    const grid = new PF.Grid(matrix);

    // Remove starting point
    result += finder.findPath(x1, y1, x2, y2, grid).length - 1;
  }

  return result;
}

async function run(goBackToStart = false) {
  const area = await loadData();
  const matrix = area.map((row) => row.map((v) => (v === '#' ? 1 : 0)));

  const allVisits = getVisits(area);

  const addStart = (p: number[]) => [0, ...p, ...(goBackToStart ? [0] : [])];

  const allPaths = permute(allVisits.filter((v) => v.at(-1) !== 0).map((v) => v.at(-1))).map(addStart);

  const allDistances = allPaths.map((path) => calculateDistance(matrix, path, allVisits));

  return Math.min(...allDistances);
}

async function partA() {
  return run(false);
}

async function partB() {
  return run(true);
}

export async function startTwentyfour() {
  return Promise.all([partA, partB].map((puzzle) => puzzle()));
}
