import { getData } from '../data';

async function solve(isTraining: boolean, sortLetters: (count: { [key: string]: number }) => (a: string, b: string) => number) {
  const data = await getData(6, isTraining);

  const counts = [];

  data.forEach((line) => {
    line.split('').forEach((letter, index) => {
      if (!counts[index]) counts[index] = {};
      counts[index][letter] = (counts[index][letter] || 0) + 1;
    });
  });

  const keys = counts.map((count) => {
    return Object.keys(count).sort(sortLetters(count))[0];
  });

  return keys.join('');
}

async function partA() {
  const sortLetters = (count: { [key: string]: number }) => (a: string, b: string) => count[b] - count[a];
  return solve(true, sortLetters);
}

async function partB() {
  const sortLetters = (count: { [key: string]: number }) => (a: string, b: string) => count[a] - count[b];
  return solve(false, sortLetters);
}

export async function startSix() {
  return Promise.all([partA, partB].map((puzzle) => puzzle()));
}
