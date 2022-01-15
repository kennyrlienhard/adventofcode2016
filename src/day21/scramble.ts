import { ActionInterface, Action } from './utils';

const ROTATE_BACK = {
  0: 9,
  6: 8,
  4: 7,
  2: 6,
  7: 4,
  5: 3,
  3: 2,
  1: 1,
};

function swapPosition(value: string, action: ActionInterface) {
  const result = value.split('');
  result[action.positionA] = value[action.positionB];
  result[action.positionB] = value[action.positionA];
  return result.join('');
}

function swapLetter(value: string, action: ActionInterface) {
  return value
    .split('')
    .map((letter) => {
      if (letter === action.letterA) return action.letterB;
      if (letter === action.letterB) return action.letterA;
      return letter;
    })
    .join('');
}

function reversePosition(value: string, action: ActionInterface) {
  const reversed = value
    .slice(action.positionA, action.positionB + 1)
    .split('')
    .reverse()
    .join('');

  return `${value.slice(0, action.positionA)}${reversed}${value.slice(action.positionB + 1)}`;
}

function rotateLeft(value: string, action: ActionInterface) {
  const steps = action.steps % value.length;
  return `${value.substring(steps)}${value.substring(0, steps)}`;
}

function rotateRight(value: string, action: ActionInterface) {
  const steps = action.steps % value.length;
  return `${value.slice(value.length - steps)}${value.slice(0, value.length - steps)}`;
}

function movePosition(value: string, action: ActionInterface) {
  const letters = value.split('');
  const part1 = letters.slice(0, action.positionA);
  const part2 = letters.slice(action.positionA + 1);

  const result = [...part1, ...part2];
  result.splice(action.positionB, 0, value[action.positionA]);
  return result.join('');
}

function rotatePosition(value: string, action: ActionInterface) {
  let steps = value.split('').findIndex((letter) => letter === action.letterA);
  steps += (steps >= 4 ? 1 : 0) + 1;
  return rotateRight(value, { ...action, steps });
}

function rotatePositionBack(value: string, action: ActionInterface) {
  const index = value.split('').findIndex((letter) => letter === action.letterA);
  return rotateLeft(value, { ...action, steps: ROTATE_BACK[index] });
}

export const scramble = {
  [Action.SwapPosition]: swapPosition,
  [Action.SwapLetter]: swapLetter,
  [Action.ReversePosition]: reversePosition,
  [Action.RotateLeft]: rotateLeft,
  [Action.RotateRight]: rotateRight,
  [Action.MovePosition]: movePosition,
  [Action.RotatePosition]: rotatePosition,
};

export const unscramble = {
  [Action.SwapPosition]: swapPosition,
  [Action.SwapLetter]: swapLetter,
  [Action.ReversePosition]: reversePosition,
  [Action.RotateLeft]: rotateRight,
  [Action.RotateRight]: rotateLeft,
  [Action.MovePosition]: movePosition,
  [Action.RotatePosition]: rotatePositionBack,
};
