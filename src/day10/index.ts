import { Action, loadData } from './utils';

interface BotInterface {
  values: number[];
  lowFrom: string;
  highFrom: string;
  lowTo: string;
  highTo: string;
}

const bots = {} as { [bot: string]: BotInterface };

function playRound() {
  Object.keys(bots).forEach((bot) => {
    if (bots[bot].values.length === 2) {
      const [low, high] = bots[bot].values;

      if (!bots[bots[bot].lowTo].values.includes(low)) {
        bots[bots[bot].lowTo].values = [...bots[bots[bot].lowTo].values, low].sort((a, b) => a - b);
      }

      if (!bots[bots[bot].highTo].values.includes(high)) {
        bots[bots[bot].highTo].values = [...bots[bots[bot].highTo].values, high].sort((a, b) => a - b);
      }

      bots[bot].values = [];
    }
    // const low = (bots[bots[bot].lowFrom] || { values: [] }).values.at(0);
    // const high = (bots[bots[bot].highFrom] || { values: [] }).values.at(-1);

    // if (low && !bots[bot].values.includes(low)) {
    //   bots[bot].values = [...bots[bot].values, low].sort((a, b) => a - b);
    // }

    // if (high && !bots[bot].values.includes(high)) {
    //   bots[bot].values = [...bots[bot].values, high].sort((a, b) => a - b);
    // }
  });
}

function searchValues(a: number, b: number) {
  return Object.keys(bots).filter((bot) => bots[bot].values.includes(a) && bots[bot].values.includes(b));
}

async function initBots(isTraining = false) {
  const data = await loadData(isTraining);

  data.forEach((action) => {
    bots[action.actor] = bots[action.actor] || ({ values: [] as number[] } as BotInterface);

    if (action.cmd === Action.GoesTo) {
      bots[action.actor].values = [...bots[action.actor].values, action.value].sort((a, b) => a - b);
    }

    if (action.cmd === Action.GivesTo) {
      bots[action.low] = bots[action.low] || ({ values: [] as number[] } as BotInterface);
      bots[action.low].lowFrom = action.actor;
      bots[action.actor].lowTo = action.low;

      bots[action.high] = bots[action.high] || ({ values: [] as number[] } as BotInterface);
      bots[action.high].highFrom = action.actor;
      bots[action.actor].highTo = action.high;
    }
  });
}

async function partA() {
  const IS_TRAINING = false;
  const search = (IS_TRAINING ? [5, 2] : [61, 17]) as [number, number];

  await initBots();

  let bot = null;

  do {
    playRound();
    [bot] = searchValues(...search);
  } while (!bot);

  return bot;
}

async function partB() {
  const IS_TRAINING = false;
  const outputs = ['output 0', 'output 1', 'output 2'];

  await initBots(IS_TRAINING);

  do {
    playRound();
  } while (outputs.filter((output) => bots[output].values.length > 0).length !== 3);

  return outputs.slice(1).reduce((acc, ouput) => acc * bots[ouput].values[0], bots[outputs[0]].values[0]);
}

export async function startTen() {
  return Promise.all([partA, partB].map((puzzle) => puzzle()));
}
