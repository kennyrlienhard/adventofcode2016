import { loadData, RoomInterface } from './utils';

function countLetters(input: string) {
  const counts = {};
  const letters = input.replace(/-/g, '').split('');

  letters.forEach((letter) => {
    counts[letter] = (counts[letter] || 0) + 1;
  });

  return counts;
}

function createChecksum(input: string) {
  const counts = countLetters(input);

  const keys = Object.keys(counts).sort((a, b) => {
    if (counts[a] > counts[b]) return -1;
    if (counts[a] < counts[b]) return 1;

    if (a > b) return 1;
    if (a < b) return -1;

    return 0;
  });

  return keys.slice(0, 5).join('');
}

async function partA() {
  const data = await loadData();

  const result = data.filter((room) => room.checksum === createChecksum(room.name)).reduce((acc, room) => acc + room.sectorId, 0);

  return result;
}

function decypherCode(letter: string, shift: number) {
  if (letter === '-') return ' ';

  const code = letter.charCodeAt(0);

  // Uppercase letters
  if (code >= 65 && code <= 90) {
    return String.fromCharCode(((code - 65 + shift) % 26) + 65);
  }

  // Lowercase letters
  else if (code >= 97 && code <= 122) {
    return String.fromCharCode(((code - 97 + shift) % 26) + 97);
  }
}

function decryptRoom(room: RoomInterface) {
  return {
    ...room,
    decrypted: room.name
      .split('')
      .map((letter) => decypherCode(letter, room.sectorId))
      .join(''),
  };
}

async function partB() {
  const IS_TRAINING = false;
  const search = IS_TRAINING ? 'very encrypted name' : 'north';

  const data = await loadData(IS_TRAINING);

  const [result] = data.map(decryptRoom).filter((room) => room.decrypted.toLowerCase().includes(search));

  return result ? result.sectorId : 0;
}

export async function startFour() {
  return Promise.all([partA, partB].map((puzzle) => puzzle()));
}
