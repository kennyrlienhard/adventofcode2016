function numberToBinary(value: number): string {
  return (value >>> 0).toString(2);
}

function partA() {
  const IS_TRAINING = false;
  const NUMBER_OF_ELVES = IS_TRAINING ? 5 : 3012210;

  const bin = numberToBinary(NUMBER_OF_ELVES);

  return parseInt(`${bin.slice(1)}${bin[0]}`, 2);
}

export function startNineteen() {
  return Promise.all([partA].map((puzzle) => puzzle()));
}
