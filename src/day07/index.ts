import { loadData } from './utils';

function isABBA(value: string) {
  for (let index = 0; index < value.length - 3; index += 1) {
    const a = value[index];
    const b = value[index + 1];
    if (a !== b && a === value[index + 3] && b === value[index + 2]) return true;
  }
  return false;
}

function containsABBA(values: string[]) {
  return values.filter((value) => isABBA(value)).length > 0;
}

async function partA() {
  let supportsTLS = 0;

  const data = await loadData();

  data.forEach((address) => {
    if (containsABBA(address.ip) && !containsABBA(address.hypernet)) supportsTLS += 1;
  });

  return supportsTLS;
}

function getABAForValue(value: string) {
  const result = [];

  for (let index = 0; index < value.length - 2; index += 1) {
    const a = value[index];
    const b = value[index + 1];
    if (a !== b && a === value[index + 2]) result.push(`${a}${b}${value[index + 2]}`);
  }
  return result;
}

function getABA(values: string[]) {
  return values.map((value) => getABAForValue(value)).flat();
}

function containsABA(values: string[], aba: string[]) {
  const bab = aba.map((value) => `${value[1]}${value[0]}${value[1]}`);
  return values.filter((value) => bab.filter((search) => value.includes(search)).length > 0).length > 0;
}

async function partB() {
  let supportsSSL = 0;

  const data = await loadData();

  data.forEach((address) => {
    const aba = getABA(address.ip);

    if (aba.length > 0 && containsABA(address.hypernet, aba)) {
      supportsSSL += 1;
    }
  });

  return supportsSSL;
}

export async function startSeven() {
  return Promise.all([partA, partB].map((puzzle) => puzzle()));
}
