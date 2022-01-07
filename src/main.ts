import { startOne } from './day01';
import { startTwo } from './day02';
import { startThree } from './day03';
import { startFour } from './day04';
import { startFive } from './day05';
import { startSix } from './day06';
import { startSeven } from './day07';
import { startEight } from './day08';

const PUZZLES = [startOne, startTwo, startThree, startFour, startFive, startSix, startSeven, startEight];

function printResult(day: number, answers: (number | string)[]) {
  const printPartial = (acc: string, part: number | string, partIndex: number) => `${acc}Part ${partIndex + 1}: ${part}, `;
  console.log(`Day ${day}. ${(answers.reduce(printPartial, '') as string).slice(0, -2)}`);
}

async function solvePuzzles(puzzlesToSolve: number[]) {
  const puzzles = puzzlesToSolve.map((day) => ({ day, solve: PUZZLES[day - 1] }));
  const results = await Promise.all(puzzles.map((puzzle) => puzzle.solve()));
  results.forEach((answers, index) => printResult(puzzles[index].day, answers));
}

const DAYS_TO_SOLVE = [8];

solvePuzzles(DAYS_TO_SOLVE);
