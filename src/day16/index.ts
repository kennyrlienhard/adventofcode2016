function generateData(a: string, length: number) {
  const b = a
    .split('')
    .reverse()
    .map((bit) => (bit === '1' ? '0' : '1'))
    .join('');

  const result = `${a}0${b}`;

  if (result.length < length) return generateData(result, length);
  return result;
}

function createChecksum(value: string) {
  let result = '';

  for (let index = 0; index < value.length; index += 2) {
    result = `${result}${value[index] === value[index + 1] ? '1' : '0'}`;
  }

  if (result.length % 2 === 0) return createChecksum(result);
  return result;
}

function run(a: string, length: number) {
  return createChecksum(generateData(a, length).slice(0, length));
}

function partA() {
  const IS_TRAINING = false;
  const LENGTH = IS_TRAINING ? 20 : 272;

  return run(IS_TRAINING ? '10000' : '01111010110010011', LENGTH);
}

function partB() {
  return run('01111010110010011', 35651584);
}

export function startSixteen() {
  return Promise.all([partA, partB].map((puzzle) => puzzle()));
}
