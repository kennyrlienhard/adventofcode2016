import { loadData } from './utils';

interface CoordinateInterface {
  h: number;
  v: number;
  d?: number;
}

const DIRECTIONS = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3,
};

function move(currentDirection: number, turn: 'L' | 'R', steps: number) {
  const d = (4 + currentDirection + (turn === 'L' ? -1 : 1)) % 4;
  const h = (d === DIRECTIONS.RIGHT ? 1 : d === DIRECTIONS.LEFT ? -1 : 0) * steps;
  const v = (d === DIRECTIONS.UP ? 1 : d === DIRECTIONS.DOWN ? -1 : 0) * steps;
  return { h, v, d };
}

async function partA() {
  const data = await loadData();

  const result = data.reduce(
    (state, [turn, steps]) => {
      const { h, v, d } = move(state.d, turn, steps);
      return Object.assign(state, { h: state.h + h, v: state.v + v, d });
    },
    { h: 0, v: 0, d: DIRECTIONS.UP }
  );

  return Math.abs(result.h) + Math.abs(result.v);
}

function addCoordinates(start: CoordinateInterface, target: CoordinateInterface) {
  const result = [];
  const horizontalChanges = start.h !== target.h;

  if (horizontalChanges && target.h > start.h) {
    for (let h = start.h + 1; h <= target.h; h += 1) {
      result.push({ h, v: target.v, d: target.d });
    }
  } else if (horizontalChanges && target.h < start.h) {
    for (let h = start.h - 1; h >= target.h; h -= 1) {
      result.push({ h, v: target.v, d: target.d });
    }
  } else if (!horizontalChanges && target.v > start.v) {
    for (let v = start.v + 1; v <= target.v; v += 1) {
      result.push({ h: target.h, v, d: target.d });
    }
  } else if (!horizontalChanges && target.v < start.v) {
    for (let v = start.v - 1; v >= target.v; v -= 1) {
      result.push({ h: target.h, v, d: target.d });
    }
  } else {
    result.push(target);
  }
  return result;
}

function countOccurences(coordinates: CoordinateInterface[]) {
  const counts = {};

  coordinates.forEach((coordinate) => {
    counts[`${coordinate.h},${coordinate.v}`] = (counts[`${coordinate.h},${coordinate.v}`] || 0) + 1;
  });

  const visitedTwice = Object.keys(counts).find((k) => counts[k] > 1);
  if (!visitedTwice) return null;

  const [h, v] = visitedTwice.split(',');
  return { h: parseInt(h, 10), v: parseInt(v, 10) };
}

async function partB() {
  let location = { h: 0, v: 0, d: DIRECTIONS.UP } as CoordinateInterface;
  const coordinates = [{ ...location }];

  const data = await loadData();

  for (const direction of data) {
    const { h, v, d } = move(location.d, direction[0], direction[1]);
    const nextLocation = { d, h: location.h + h, v: location.v + v };
    coordinates.push(...addCoordinates(location, nextLocation));
    location = nextLocation;

    const visitedTwice = countOccurences(coordinates);
    if (visitedTwice) {
      location = visitedTwice;
      break;
    }
  }

  return Math.abs(location.h) + Math.abs(location.v);
}

export async function startOne() {
  return Promise.all([partA, partB].map((puzzle) => puzzle()));
}
