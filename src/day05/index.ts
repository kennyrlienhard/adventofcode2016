import crypto from 'crypto';

const IS_TRAINING = false;

const DOOR_ID = IS_TRAINING ? 'abc' : 'uqwqemis';

const PWD_LENGTH = 8;

const STOP = '00000';

async function partA() {
  let password = '';

  let hash = '';
  let index = 0;

  do {
    do {
      hash = crypto.createHash('md5').update(`${DOOR_ID}${index}`).digest('hex');
      index += 1;
    } while (hash.slice(0, 5) !== STOP);

    password = `${password}${hash[5]}`;
    hash = '';
  } while (password.length < PWD_LENGTH);

  return password;
}

async function partB() {
  const password = [];

  let hash = '';
  let index = 0;

  do {
    do {
      hash = crypto.createHash('md5').update(`${DOOR_ID}${index}`).digest('hex');
      index += 1;
    } while (hash.slice(0, 5) !== STOP);

    const position = parseInt(hash[5], 10);

    if (position >= 0 && position < PWD_LENGTH && !password[position]) {
      password[position] = hash[6];
    }

    hash = '';
  } while (password.filter((p) => p).length < PWD_LENGTH);

  return password.join('');
}

export async function startFive() {
  return Promise.all([partA, partB].map((puzzle) => puzzle()));
}
