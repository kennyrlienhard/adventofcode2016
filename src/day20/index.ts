import { loadData } from './utils';

const IS_TRAINING = false;
const [START, END] = IS_TRAINING ? [0, 9] : [0, 4294967295];

function testIPAddress(value: number, firewall: [number, number][]): [boolean, number] {
  for (let index = 0; index < firewall.length; index++) {
    const [start, end] = firewall[index];
    if (value >= start && value <= end) return [false, end + 1];
  }

  return [true, value];
}

async function partA() {
  const firewall = await loadData(IS_TRAINING);

  let result = START;

  let isValid = false;

  do {
    [isValid, result] = testIPAddress(result, firewall);
  } while (!isValid && result <= END);

  return result;
}

async function partB() {
  const firewall = await loadData(IS_TRAINING);

  let ipAddress = START;

  let allowed = 0;
  let isValid = false;

  do {
    [isValid, ipAddress] = testIPAddress(ipAddress, firewall);

    if (isValid) {
      allowed += 1;
      ipAddress += 1;
    }
  } while (ipAddress <= END);

  return allowed;
}

export function startTwenty() {
  return Promise.all([partA, partB].map((puzzle) => puzzle()));
}
