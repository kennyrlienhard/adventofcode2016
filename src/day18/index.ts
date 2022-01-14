import { loadData, Tile } from './utils';

function isTrap(left: Tile, center: Tile, right: Tile) {
  const leftIsTrap = left === Tile.Trap;
  const centerIsTrap = center === Tile.Trap;
  const rightIsTrap = right === Tile.Trap;

  if (leftIsTrap && centerIsTrap && !rightIsTrap) return true;
  if (centerIsTrap && rightIsTrap && !leftIsTrap) return true;
  if (leftIsTrap && !centerIsTrap && !rightIsTrap) return true;
  if (rightIsTrap && !centerIsTrap && !leftIsTrap) return true;

  return false;
}

function getNeighbours(input: Tile[], index: number): [Tile, Tile, Tile] {
  const leftIndex = index - 1;
  const rightIndex = index + 1;

  return [leftIndex < 0 ? Tile.Safe : input[leftIndex], input[index], rightIndex >= input.length ? Tile.Safe : input[rightIndex]];
}

function createRow(input: Tile[]) {
  return input.map((tile, index) => isTrap(...getNeighbours(input, index))).map((trap) => (trap ? Tile.Trap : Tile.Safe));
}

function printRoom(room: Tile[][]) {
  room.forEach((row) => {
    console.log(row.join(''));
  });
  console.log();
}

function countSafeTiles(room: Tile[][]) {
  const lineReducer = (acc: number, tile: Tile) => acc + (tile === Tile.Safe ? 1 : 0);
  return room.reduce((acc, row) => acc + row.reduce(lineReducer, 0), 0);
}

async function run(rowsToCreate: number, isTraining = false) {
  const room = await loadData(isTraining);

  for (let index = 0; index < rowsToCreate; index += 1) {
    room.push(createRow(room[index]));
  }

  //   printRoom(room);

  return countSafeTiles(room);
}

async function partA() {
  const IS_TRAINING = false;
  const ROWS_TO_CREATE = (IS_TRAINING ? 10 : 40) - 1;

  return run(ROWS_TO_CREATE);
}

async function partB() {
  return run(400000);
}

export function startEightteen() {
  return Promise.all([partA, partB].map((puzzle) => puzzle()));
}
