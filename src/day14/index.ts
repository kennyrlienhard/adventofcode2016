import crypto from 'crypto';

const NUMBER_OF_KEYS = 64;
const IS_TRAINING = false;
const SALT = IS_TRAINING ? 'abc' : 'ngcjuoqr';

function getFirstLetter(input: string, occurences: number): [boolean, string?] {
  let result = '';

  for (let index = 0; index < input.length; index++) {
    const letter = input[index];

    if (!result.includes(letter)) result = letter;
    else {
      result = `${result}${letter}`;
      if (result.length === occurences) return [true, letter];
    }
  }

  return [false];
}

function computeHash(value: string, round = 0, targetRound = 1) {
  const hash = crypto.createHash('md5').update(value).digest('hex').toLowerCase();
  const nextRound = round + 1;
  if (nextRound === targetRound) return hash;
  return computeHash(hash, nextRound, targetRound);
}

function run(hashRounds = 1) {
  const hashes = Array.from({ length: 1001 }).map((_, i) => computeHash(`${SALT}${i}`, 0, hashRounds));
  const keys = [];
  let index = 0;

  while (keys.length < NUMBER_OF_KEYS) {
    const hash = hashes.shift();

    hashes.push(computeHash(`${SALT}${index + 1000}`, 0, hashRounds));

    const [isKey, letter] = getFirstLetter(hash, 3);

    if (isKey) {
      for (let i = 0; i < hashes.length; i++) {
        const [, pairLetter] = getFirstLetter(hashes[i], 5);

        if (pairLetter === letter) {
          keys.push({ index, hash });
          if (keys.length === NUMBER_OF_KEYS) return index - 1;
          break;
        }
      }
    }

    index++;
  }
}

function partA() {
  return run();
}

function partB() {
  const HASH_ROUNDS = 2017;
  return run(HASH_ROUNDS);
}

export function startFourteen() {
  return [partA, partB].map((puzzle) => puzzle());
}
