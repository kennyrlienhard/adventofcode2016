import crypto from 'crypto';

import { RoomInterface, DIRECTIONS, MOVEMENTS, PASSCODE, START, TARGET } from './constants';

function getHash(passcode: string) {
  return crypto.createHash('md5').update(passcode).digest('hex');
}

const isOpen =
  (room: RoomInterface) =>
  (door: string, index: number): boolean =>
    ['b', 'c', 'd', 'e', 'f'].includes(door) &&
    room.y + MOVEMENTS[index].y <= TARGET &&
    room.y + MOVEMENTS[index].y >= 0 &&
    room.x + MOVEMENTS[index].x <= TARGET &&
    room.x + MOVEMENTS[index].x >= 0;

function getRooms(passcode: string, room: RoomInterface) {
  return getHash(passcode)
    .slice(0, 4)
    .split('')
    .map(isOpen(room))
    .map((s, i) => (s ? { y: room.y + MOVEMENTS[i].y, x: room.x + MOVEMENTS[i].x, direction: DIRECTIONS[i] } : null))
    .filter((d) => d);
}

function partA() {
  let bestPath = [] as RoomInterface[];

  function walk(where: RoomInterface, path: RoomInterface[]) {
    if (path.length < bestPath.length || bestPath.length === 0) {
      if (where.x === TARGET && where.y === TARGET) {
        bestPath = [...path];
      } else {
        const passcode = `${PASSCODE}${path.reduce((acc, d) => `${acc}${d.direction}`, '')}`;
        getRooms(passcode, where).forEach((room) => walk(room, [...path, room]));
      }
    }
  }

  walk(START, [START]);

  return bestPath.reduce((acc, room) => `${acc}${room.direction}`, '');
}

function partB() {
  let bestPath = [] as RoomInterface[];

  function walk(where: RoomInterface, path: RoomInterface[]) {
    if (where.x === TARGET && where.y === TARGET && path.length > bestPath.length) {
      bestPath = [...path];
    } else if (where.x !== TARGET || where.y !== TARGET) {
      const passcode = `${PASSCODE}${path.reduce((acc, d) => `${acc}${d.direction}`, '')}`;
      getRooms(passcode, where).forEach((room) => walk(room, [...path, room]));
    }
  }

  walk(START, [START]);

  return bestPath.slice(0, -1).length;
}

export function startSeventeen() {
  return [partA, partB].map((puzzle) => puzzle());
}
