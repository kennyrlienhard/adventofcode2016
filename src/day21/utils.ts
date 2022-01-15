import { getData } from '../data';

export enum Action {
  SwapPosition = 'swap position',
  SwapLetter = 'swap letter',
  RotateRight = 'rotate right',
  RotateLeft = 'rotate left',
  RotatePosition = 'rotate based on position',
  ReversePosition = 'reverse positions',
  MovePosition = 'move position',
}

export interface ActionInterface {
  action: string;
  positionA?: number;
  positionB?: number;
  letterA?: string;
  letterB?: string;
  steps?: number;
}

export async function loadData(trainingData = false): Promise<ActionInterface[]> {
  const parseInput = (input: string) => {
    const parts = input.trim().split(' ');

    if (input.includes(Action.SwapPosition)) {
      return { action: Action.SwapPosition, positionA: parseInt(parts.at(2), 10), positionB: parseInt(parts.at(-1), 10) };
    }

    if (input.includes(Action.SwapLetter)) {
      return { action: Action.SwapLetter, letterA: parts.at(2), letterB: parts.at(-1) };
    }

    if (input.includes(Action.RotateLeft)) {
      return { action: Action.RotateLeft, steps: parseInt(parts.at(2), 10) };
    }

    if (input.includes(Action.RotateRight)) {
      return { action: Action.RotateRight, steps: parseInt(parts.at(2), 10) };
    }

    if (input.includes(Action.RotatePosition)) {
      return { action: Action.RotatePosition, letterA: parts.at(-1) };
    }

    if (input.includes(Action.ReversePosition)) {
      return { action: Action.ReversePosition, positionA: parseInt(parts.at(2), 10), positionB: parseInt(parts.at(-1), 10) };
    }

    if (input.includes(Action.MovePosition)) {
      return { action: Action.MovePosition, positionA: parseInt(parts.at(2), 10), positionB: parseInt(parts.at(-1), 10) };
    }

    return null;
  };

  return (await getData(21, trainingData)).map(parseInput);
}
