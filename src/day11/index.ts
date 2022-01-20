import Pathfinder from 'abstract-pathfinder';

const IS_TRAINING = false;

const TARGET_FLOOR = 4;

function getState(puzzle: string) {
  if (IS_TRAINING) return [1, 1, 2, 1, 3];

  if (puzzle === 'b') {
    return [
      1, // elevator
      1, // elerium-compatible microchip
      1, // elerium generator
      1, // dilithium-compatible microchip
      1, // dilithium generator
      1, // thulium-compatible microchip
      1, // thulium generator
      2, // plutonium-compatible microchip
      1, // plutonium generator
      2, // strontium-compatible microchip
      1, // strontium generator
      3, // promethium-compatible microchip
      3, // promethium generator
      3, // ruthenium-compatible microchip
      3, // ruthenium generator
    ];
  }

  return [
    1, // elevator
    1, // thulium-compatible microchip
    1, // thulium generator
    2, // plutonium-compatible microchip
    1, // plutonium generator
    2, // strontium-compatible microchip
    1, // strontium generator
    3, // promethium-compatible microchip
    3, // promethium generator
    3, // ruthenium-compatible microchip
    3, // ruthenium generator
  ];
}

function isValid(state: number[]) {
  const danger = [];

  for (let i = 1; i < state.length; i += 2) {
    const chip = state[i];
    const gen = state[i + 1];
    if (chip !== gen) danger[chip] = true;
  }

  for (let i = 1; i < state.length; i += 2) {
    const gen2 = state[i + 1];
    if (danger[gen2]) return false;
  }

  return true;
}

function getNeighbor(state: number[], direction: number, item1: number, item2?: number) {
  const n = [...state];
  n[0] += direction;
  n[item1] += direction;
  if (item2) n[item2] += direction;

  return [isValid(n), n];
}

function createNeighborStates(state: number[]) {
  const neighbors = [];

  function addDirection(direction: number) {
    const itemsOnElevatorFloor = state
      .map((item, index) => (index > 0 && item === state[0] ? index : null))
      .filter((item) => item);

    if (itemsOnElevatorFloor.length === 0) return null;

    for (const item1 of itemsOnElevatorFloor) {
      // move single items
      const [isValid1, n1] = getNeighbor(state, direction, item1);
      if (isValid1) neighbors.push(n1);

      // move two items
      for (const item2 of itemsOnElevatorFloor) {
        if (item1 >= item2) continue;
        const [isValid2, n2] = getNeighbor(state, direction, item1, item2);
        if (isValid2) neighbors.push(n2);
      }
    }
  }

  if (state[0] > 1) addDirection(-1);
  if (state[0] < 4) addDirection(1);

  return neighbors;
}

function run(state: number[]) {
  const target = new Array(state.length).fill(TARGET_FLOOR);
  const finder = new Pathfinder();

  finder.nodeToPrimitive = (node: number[]) => node.join(',');

  finder.getMovementCost = () => 1;

  finder.getNeighbors = (node: number[]) => createNeighborStates(node);

  finder.getHeuristic = function (nodeA: number[], nodeB: number[]) {
    return nodeA.slice(1).reduce((acc, item, i) => acc + 2 * Math.abs(item - nodeB[i + 1]), Math.abs(nodeA[0] - nodeB[0]));
  };

  return finder.findPath(state, target).length - 1;
}

function partA() {
  return run(getState('a'));
}

function partB() {
  return run(getState('b'));
}

export function startEleven() {
  return [partA, partB].map((puzzle) => puzzle());
}
