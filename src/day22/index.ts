import { loadData, NodeInterface } from './utils';

function isViablePair(a: NodeInterface, b: NodeInterface) {
  const sameNode = a.x === b.x && a.y === b.y;
  const nodeAIsEmpty = a.used === 0;
  const dataWouldFit = a.used <= b.avail;
  return !sameNode && !nodeAIsEmpty && dataWouldFit;
}

async function partA() {
  const IS_TRAINING = false;

  const nodes = await loadData(IS_TRAINING);

  let viablePairs = 0;

  nodes.forEach((nodeA) => {
    nodes.forEach((nodeB) => {
      if (isViablePair(nodeA, nodeB)) viablePairs += 1;
    });
  });

  return viablePairs;
}

function nodesToObject(nodes: NodeInterface[]) {
  const result = {};

  nodes.forEach((n) => {
    result[`${n.x},${n.y}`] = n;
  });

  return result;
}

function printGrid(grid: string[][]) {
  grid.forEach((row) => {
    console.log(row.join(''));
  });
  console.log();
}

function createGrid(nodes: { [key: string]: NodeInterface }, maxY: number, maxX: number, maxSize: number) {
  const grid = [];

  for (let y = 0; y <= maxY; y++) {
    const row = [];
    for (let x = 0; x <= maxX; x++) {
      const { size, used } = nodes[`${x},${y}`];

      let marker = '#';

      if (x === 0 && y === 0) {
        marker = 'x';
      } else if (x === maxX && y === 0) {
        marker = 'G';
      } else if (used === 0) {
        marker = '_';
      } else if (size < maxSize || (maxSize >= size && used < 0.8)) {
        marker = '.';
      }

      row.push(marker);
    }
    grid.push(row);
  }

  return grid;
}

function getNextPositions(where: [number, number], path: [number, number][], grid: string[][]): [number, number][] {
  const [x, y] = where;

  const existingPositions = new Set([...path.map((p) => p.join(','))]);

  const isWall = (p: [number, number]) => grid[p[1]][p[0]] === '#';

  if (y - 1 >= 0 && !existingPositions.has(`${x},${y - 1}`) && !isWall([x, y - 1])) {
    return [[x, y - 1]];
  }

  const horizontalPositions = [
    [x - 1, y],
    [x + 1, y],
  ] as [number, number][];

  return horizontalPositions.filter(
    (p) => p[0] < grid[0].length && p[0] >= 0 && !isWall(p) && !existingPositions.has(p.join(','))
  ) as [number, number][];
}

async function partB() {
  const IS_TRAINING = false;

  const nodes = await loadData(IS_TRAINING);

  const maxY = Math.max(...nodes.map((n) => n.y));
  const maxX = Math.max(...nodes.map((n) => n.x));
  const maxSize = Math.max(...nodes.map((n) => n.size));

  const emptyNode = nodes.find((n) => n.used === 0);

  const grid = createGrid(nodesToObject(nodes), maxY, maxX, maxSize * 0.8);
  printGrid(grid);

  let bestPath = [];

  function moveEmptyBeforeGoal(where: [number, number], path: [number, number][]) {
    if (path.length < bestPath.length || bestPath.length === 0) {
      if (where[0] === maxX - 1 && where[1] === 0) {
        bestPath = [...path];
      } else {
        getNextPositions(where, path, grid).forEach((p) => moveEmptyBeforeGoal(p, [...path, p]));
      }
    }
  }

  moveEmptyBeforeGoal([emptyNode.x, emptyNode.y], []);

  return bestPath.length + (maxX - 1) * 5 + 1;
}

export function startTwentytwo() {
  return Promise.all([partA, partB].map((puzzle) => puzzle()));
}
