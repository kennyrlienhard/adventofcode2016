const IS_TRAINING = false;

const FAVORITE_NUMBER = IS_TRAINING ? 10 : 1362;

const START = [1, 1] as [number, number];

function numberToBinary(value: number): string {
  return (value >>> 0).toString(2);
}

function isOpenSpace(x: number, y: number) {
  const binaryValue = numberToBinary(x * x + 3 * x + 2 * x * y + y + y * y + FAVORITE_NUMBER);
  const result = binaryValue.split('').reduce((acc, value) => acc + (value === '1' ? 1 : 0), 0);
  return result % 2 == 0;
}

function getNextPositions(where: [number, number]): [number, number][] {
  const getValidPositions = (position: [number, number]) =>
    position[0] >= 0 && position[1] >= 0 && isOpenSpace(position[0], position[1]);

  return [
    [where[0], where[1] - 1],
    [where[0] + 1, where[1]],
    [where[0], where[1] + 1],
    [where[0] - 1, where[1]],
  ].filter(getValidPositions) as [number, number][];
}

function partA() {
  const X_TARGET = IS_TRAINING ? 7 : 31;
  const Y_TARGET = IS_TRAINING ? 4 : 39;

  let bestPath = [];

  function walk(where: [number, number], path: [number, number][]) {
    if (path.length < bestPath.length || bestPath.length === 0) {
      if (where[0] === X_TARGET && where[1] === Y_TARGET) {
        bestPath = [...path];
      } else {
        const existingPositions = new Set([...path.map((p) => p.join(','))]);

        getNextPositions(where)
          .filter((p) => !existingPositions.has(p.join(',')))
          .forEach((position) => walk(position, [...path, position]));
      }
    }
  }

  walk([...START], []);

  return bestPath.length;
}

export function partB() {
  const MAX_STEPS = 50;

  let paths = [[[...START]]];

  const visited = new Set([START.join(',')]);
  let steps = 0;

  while (steps < MAX_STEPS) {
    const nextPaths = [];

    for (const path of paths) {
      const currentPosition = path.slice(-1)[0] as [number, number];
      const positions = getNextPositions(currentPosition).filter((p) => !visited.has(p.join(',')));

      for (const position of positions) {
        visited.add(position.join(','));
        nextPaths.push([...path, position]);
      }
    }
    steps += 1;
    paths = nextPaths;
  }

  return visited.size;
}

export function startThirteen() {
  return [partA, partB].map((puzzle) => puzzle());
}
