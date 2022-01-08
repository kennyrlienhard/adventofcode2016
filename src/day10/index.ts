import { Action, loadData } from './utils';

interface BotInterface {
  values: number[];
  lowFrom: string;
  highFrom: string;
  lowTo: string;
  highTo: string;
}

function playRound(bots: { [bot: string]: BotInterface }) {
  const nextBots = { ...bots };

  Object.keys(bots).forEach((bot) => {
    if (bots[bot].values.length === 2) {
      const [low, high] = bots[bot].values;

      if (!bots[bots[bot].lowTo].values.includes(low)) {
        nextBots[bots[bot].lowTo].values = [...bots[bots[bot].lowTo].values, low].sort((a, b) => a - b);
      }

      if (!bots[bots[bot].highTo].values.includes(high)) {
        nextBots[bots[bot].highTo].values = [...bots[bots[bot].highTo].values, high].sort((a, b) => a - b);
      }

      nextBots[bot].values = [];
    }
  });

  return nextBots;
}

function searchValues(bots: { [bot: string]: BotInterface }, a: number, b: number) {
  return Object.keys(bots).filter((bot) => bots[bot].values.includes(a) && bots[bot].values.includes(b));
}

async function initBots(isTraining = false) {
  const data = await loadData(isTraining);
  const bots = {} as { [bot: string]: BotInterface };

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

  return bots;
}

async function partA() {
  const IS_TRAINING = false;
  const search = (IS_TRAINING ? [5, 2] : [61, 17]) as [number, number];

  const bots = await initBots();

  let bot = null;

  do {
    playRound(bots);
    [bot] = searchValues(bots, ...search);
  } while (!bot);

  return bot;
}

async function partB() {
  const IS_TRAINING = false;
  const outputs = ['output 0', 'output 1', 'output 2'];

  const bots = await initBots(IS_TRAINING);

  do {
    playRound(bots);
  } while (outputs.filter((output) => bots[output].values.length > 0).length !== 3);

  return outputs.slice(1).reduce((acc, ouput) => acc * bots[ouput].values[0], bots[outputs[0]].values[0]);
}

export async function startTen() {
  return Promise.all([partA, partB].map((puzzle) => puzzle()));
}
