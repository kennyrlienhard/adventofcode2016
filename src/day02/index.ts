import { Direction, loadData } from './utils';

const EMPTY = 'X';

const KEYPAD_PART_ONE = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const KEYPAD_PART_TWO = [
  [EMPTY, EMPTY, '1', EMPTY, EMPTY],
  [EMPTY, '2', '3', '4', EMPTY],
  ['5', '6', '7', '8', '9'],
  [EMPTY, 'A', 'B', 'C', EMPTY],
  [EMPTY, EMPTY, 'D', EMPTY, EMPTY],
];

const MOVES = {
  D: [1, 0],
  U: [-1, 0],
  R: [0, 1],
  L: [0, -1],
};

async function partA() {
  function keyIsValid(position: [number, number], move: Direction) {
    try {
      const [y, x] = MOVES[move];
      return Boolean(KEYPAD_PART_ONE[position[0] + y][position[1] + x]);
    } catch (error) {
      return false;
    }
  }

  function getNextPosition(start: [number, number], keys: Direction[]): [number, number] {
    let result = [...start] as [number, number];

    keys.forEach((key) => {
      if (keyIsValid(result, key)) {
        const [y, x] = MOVES[key];
        result = [result[0] + y, result[1] + x];
      }
    });

    return result;
  }

  const data = await loadData();

  let position = [1, 1] as [number, number];
  let result = ``;

  data.forEach((moves) => {
    position = getNextPosition(position, moves);
    result = `${result}${KEYPAD_PART_ONE[position[0]][position[1]]}`;
  });

  return parseInt(result, 10);
}

async function partB() {
  function keyIsValid(position: [number, number], move: Direction) {
    try {
      const [y, x] = MOVES[move];
      const key = KEYPAD_PART_TWO[position[0] + y][position[1] + x];
      return Boolean(key) && key !== EMPTY;
    } catch (error) {
      return false;
    }
  }

  function getNextPosition(start: [number, number], keys: Direction[]): [number, number] {
    let result = [...start] as [number, number];

    keys.forEach((key) => {
      if (keyIsValid(result, key)) {
        const [y, x] = MOVES[key];
        result = [result[0] + y, result[1] + x];
      }
    });

    return result;
  }

  const data = await loadData();

  let position = [2, 0] as [number, number];
  let result = ``;

  data.forEach((moves) => {
    position = getNextPosition(position, moves);
    result = `${result}${KEYPAD_PART_TWO[position[0]][position[1]]}`;
  });

  return result;
}

export async function startTwo() {
  return Promise.all([partA, partB].map((puzzle) => puzzle()));
}
