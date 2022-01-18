import { startOne } from './day01';
import { startTwo } from './day02';
import { startThree } from './day03';
import { startFour } from './day04';
import { startFive } from './day05';
import { startSix } from './day06';
import { startSeven } from './day07';
import { startEight } from './day08';
import { startNine } from './day09';
import { startTen } from './day10';
import { startTwelve } from './day12';
import { startThirteen } from './day13';
import { startFourteen } from './day14';
import { startFiveteen } from './day15';
import { startSixteen } from './day16';
import { startSeventeen } from './day17';
import { startEightteen } from './day18';
import { startNineteen } from './day19';
import { startTwenty } from './day20';
import { startTwentyone } from './day21';
import { startTwentytwo } from './day22';
import { startTwentythree } from './day23';
import { startTwentyfour } from './day24';

const PUZZLES = [
  startOne,
  startTwo,
  startThree,
  startFour,
  startFive,
  startSix,
  startSeven,
  startEight,
  startNine,
  startTen,
  null,
  startTwelve,
  startThirteen,
  startFourteen,
  startFiveteen,
  startSixteen,
  startSeventeen,
  startEightteen,
  startNineteen,
  startTwenty,
  startTwentyone,
  startTwentytwo,
  startTwentythree,
  startTwentyfour,
];

function printResult(day: number, answers: (number | string)[]) {
  const printPartial = (acc: string, part: number | string, partIndex: number) => `${acc}Part ${partIndex + 1}: ${part}, `;
  console.log(`Day ${day}. ${(answers.reduce(printPartial, '') as string).slice(0, -2)}`);
}

async function solvePuzzles(puzzlesToSolve: number[]) {
  const puzzles = puzzlesToSolve.map((day) => ({ day, solve: PUZZLES[day - 1] }));
  const results = await Promise.all(puzzles.map((puzzle) => puzzle.solve()));
  results.forEach((answers, index) => printResult(puzzles[index].day, answers));
}

const DAYS_TO_SOLVE = [24];

solvePuzzles(DAYS_TO_SOLVE);
