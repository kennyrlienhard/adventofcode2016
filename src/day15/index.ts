import { DiscInterface, loadData } from './utils';

function positionAtTime(disc: DiscInterface, time: number) {
  return (disc.initialPosition + time + 1) % disc.positions;
}

function run(discs: DiscInterface[]) {
  let start = 0;
  let discsReached = 0;

  do {
    let time = start;
    discsReached = 0;

    for (let index = 0; index < discs.length; index++) {
      time += 1;
      const disc = discs[index];
      const position = positionAtTime(disc, time);
      if (position === 0) discsReached += 1;
      else break;
    }

    start += 1;
  } while (discsReached < discs.length);

  return start;
}

async function partA() {
  const discs = await loadData();
  return run(discs.slice(0, -1));
}

async function partB() {
  const discs = await loadData();
  return run(discs);
}

export function startFiveteen() {
  return Promise.all([partA, partB].map((puzzle) => puzzle()));
}
