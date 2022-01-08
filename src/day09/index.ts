import { getData } from '../data';

function getParams(marker: RegExpMatchArray) {
  const [length, repeat] = marker[0]
    .match(/\(([^)]+)\)/)[1]
    .split('x')
    .map((value) => parseInt(value, 10));

  return { start: marker.index + marker[0].length, length, repeat };
}

function handleMarker(marker: RegExpMatchArray, original: string, currentIndex: number): [string, number] {
  const { start, length, repeat } = getParams(marker);
  const copy = original.slice(currentIndex + start, currentIndex + start + length);
  const replaceWith = new Array(repeat).fill(copy).join('');
  return [`${original.slice(currentIndex, currentIndex + marker.index)}${replaceWith}`, start + length];
}

function decompress(value: string) {
  let result = '';
  let index = 0;

  let markers = [...value.matchAll(/\([0-9]+x[0-9]+\)/g)];
  if (markers.length === 0) return value;

  do {
    const [decompressed, nextIndex] = handleMarker(markers[0], value, index);
    result = `${result}${decompressed}`;
    index += nextIndex;
    markers = [...value.slice(index).matchAll(/\([0-9]+x[0-9]+\)/g)];
  } while (markers.length > 0);

  result = `${result}${value.slice(index)}`;

  return result;
}

function updateWeights(weights: number[], marker: RegExpMatchArray, position: number) {
  const { start, length, repeat } = getParams(marker);

  const from = start + position;
  const to = start + position + length;

  return weights.map((weight, index) => {
    if (index < from || index >= to) return weight;
    return weight * repeat;
  });
}

function decompressVersionTwo(value: string): number {
  let lock = 0;
  let result = 0;

  let weights = new Array(value.length).fill(1);

  for (const [index] of value.split('').entries()) {
    const [nextMarker] = [...value.slice(index).matchAll(/\([0-9]+x[0-9]+\)/g)];

    if (nextMarker && nextMarker.index === 0) {
      weights = updateWeights(weights, nextMarker, index);
      lock = nextMarker[0].length;
    } else if (lock <= 0) {
      result += weights[index];
    }

    lock -= 1;
  }

  return result;
}

async function partA() {
  const result = [];
  const data = await getData(9, false);

  data.forEach((value) => {
    const decompressedValue = decompress(value);
    result.push(decompressedValue);
  });

  return result.reduce((acc, value) => acc + value.replace(/\s/g, '').length, 0);
}

async function partB() {
  const result = [];
  const data = await getData(9, false);

  data.forEach((value) => {
    const length = decompressVersionTwo(value);
    result.push(length);
  });

  return result.reduce((acc, value) => acc + value, 0);
}

export async function startNine() {
  return Promise.all([partA, partB].map((puzzle) => puzzle()));
}
