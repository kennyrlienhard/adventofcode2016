import { loadData } from './utils';

function isValidTriangle(a: number, b: number, c: number) {
  return a + b > c && a + c > b && b + c > a;
}

async function partA() {
  let result = 0;
  const data = await loadData();

  data.forEach((triangle) => {
    if (isValidTriangle(triangle[0], triangle[1], triangle[2])) result += 1;
  });

  return result;
}

function convertData(data: number[][]) {
  const result = [];
  let columns = {};

  for (let row = 0; row < data.length; row += 1) {
    const isNextGroup = row % 3 === 0;

    if (isNextGroup) {
      result.push(...Object.values(columns));
      columns = {};
    }

    for (let column = 0; column < data[row].length; column += 1) {
      const key = column.toString();

      if (!isNextGroup) columns[key].push(data[row][column]);
      else columns[key] = [data[row][column]];
    }
  }

  result.push(...Object.values(columns));

  return result;
}

async function partB() {
  let result = 0;

  const data = await loadData();
  const columns = convertData(data);

  columns.forEach((triangle) => {
    if (isValidTriangle(triangle[0], triangle[1], triangle[2])) result += 1;
  });

  return result;
}

export async function startThree() {
  return Promise.all([partA, partB].map((puzzle) => puzzle()));
}
