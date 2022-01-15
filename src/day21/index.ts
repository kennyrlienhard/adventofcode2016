import { scramble, unscramble } from './scramble';
import { Action, loadData } from './utils';

async function partA() {
  const IS_TRAINING = false;
  const data = await loadData(IS_TRAINING);

  let result = IS_TRAINING ? 'abcde' : 'abcdefgh';

  data.forEach((item) => {
    result = scramble[item.action](result, item);
  });

  return result;
}

async function partB() {
  const IS_TRAINING = false;
  const data = await loadData(IS_TRAINING);

  let result = IS_TRAINING ? 'decab' : 'fbgdceah';

  data.reverse().forEach((item) => {
    const reverseItem = {
      ...item,
      ...(item.action === Action.MovePosition && { positionA: item.positionB }),
      ...(item.action === Action.MovePosition && { positionB: item.positionA }),
    };

    result = unscramble[item.action](result, reverseItem);
  });

  return result;
}

export function startTwentyone() {
  return Promise.all([partA, partB].map((puzzle) => puzzle()));
}
