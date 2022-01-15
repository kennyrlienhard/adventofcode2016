const IS_TRAINING = false;
const NUMBER_OF_ELVES = IS_TRAINING ? 5 : 3012210;

function numberToBinary(value: number): string {
  return (value >>> 0).toString(2);
}

function partA() {
  const bin = numberToBinary(NUMBER_OF_ELVES);
  return parseInt(`${bin.slice(1)}${bin[0]}`, 2);
}

function partB() {
  const n = NUMBER_OF_ELVES;

  const pow = Math.floor(Math.log(n) / Math.log(3));
  const b = Math.pow(3, pow);

  if (n === b) return n;

  if (n - b <= b) return n - b;

  return 2 * n - 3 * b;
}

export function startNineteen() {
  return [partA, partB].map((puzzle) => puzzle());
}
