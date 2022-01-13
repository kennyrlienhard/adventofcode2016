export interface RoomInterface {
  x: number;
  y: number;
  direction?: string;
}

export const DIRECTIONS = {
  0: 'U',
  1: 'D',
  2: 'L',
  3: 'R',
};

export const MOVEMENTS = {
  0: { x: 0, y: -1 },
  1: { x: 0, y: 1 },
  2: { x: -1, y: 0 },
  3: { x: 1, y: 0 },
};

export const START = { x: 0, y: 0, direction: '' };

export const TARGET = 3;

export const IS_TRAINING = false;

export const PASSCODE = IS_TRAINING ? 'kglvqrro' : 'yjjvjgan';
