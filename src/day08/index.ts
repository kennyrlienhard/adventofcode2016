import { CmdInterface, loadData } from './utils';

function createScreen(width: number, height: number) {
  const result = [];
  for (let y = 0; y < height; y++) {
    const line = [];
    for (let x = 0; x < width; x++) {
      line.push('.');
    }
    result.push(line);
  }
  return result;
}

function drawRect(screen: string[][], cmd: CmdInterface) {
  const nextScreen = screen.map((line) => line.map((px) => px));

  for (let y = 0; y < cmd.y; y++) {
    for (let x = 0; x < cmd.x; x++) {
      nextScreen[y][x] = '#';
    }
  }

  return nextScreen;
}

function rotateRow(screen: string[][], cmd: CmdInterface) {
  const nextScreen = screen.map((line) => line.map((px) => px));
  const width = nextScreen[cmd.y].length;

  for (let x = 0; x < width; x += 1) {
    const target = x + cmd.x;
    const index = target < width ? target : target - width;
    nextScreen[cmd.y][index] = screen[cmd.y][x];
  }

  return nextScreen;
}

function rotateColumn(screen: string[][], cmd: CmdInterface) {
  const nextScreen = screen.map((line) => line.map((px) => px));
  const height = nextScreen.length;

  for (let y = 0; y < height; y += 1) {
    const target = y + cmd.y;
    const index = target < height ? target : target - height;
    nextScreen[index][cmd.x] = screen[y][cmd.x];
  }

  return nextScreen;
}

function displayScreen(title: string, screen: string[][]) {
  console.log(title);
  console.log();

  screen.forEach((line) => {
    console.log(line.join(''));
  });
  console.log();
}

function countLitPixels(screen: string[][]) {
  const lineReducer = (acc: number, px: string) => acc + (px === '#' ? 1 : 0);
  return screen.reduce((acc, line) => acc + line.reduce(lineReducer, 0), 0);
}

const CMD = {
  rect: drawRect,
  'rotate row': rotateRow,
  'rotate column': rotateColumn,
};

async function partA() {
  let screen = createScreen(50, 6);

  const data = await loadData();

  data.forEach((item) => {
    screen = CMD[item.cmd](screen, item);
  });

  displayScreen('Part 2:', screen);

  return countLitPixels(screen);
}

export async function startEight() {
  return Promise.all([partA].map((puzzle) => puzzle()));
}
