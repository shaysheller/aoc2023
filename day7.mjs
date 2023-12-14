import { parse } from "./functions/parse.mjs";

const d = parse("day7.txt");
const sample = parse("day7sample.txt");

const furtherParse = (arr) => {
  const result = arr.map((a) => {
    const [hand, bet] = a.split(" ");
    return [hand, Number(bet)];
  });
  return result;
};

const sampleData = furtherParse(sample);
const data = furtherParse(d);
console.log(data);

const cardValues = new Map();
cardValues.set("A", 1);
cardValues.set("K", 2);
cardValues.set("Q", 3);
cardValues.set("J", 14);
cardValues.set("T", 5);
cardValues.set("9", 6);
cardValues.set("8", 7);
cardValues.set("7", 8);
cardValues.set("6", 9);
cardValues.set("5", 10);
cardValues.set("4", 11);
cardValues.set("3", 12);
cardValues.set("2", 13);

const nameHand = (handObj) => {
  let one = false;
  let two = false;
  let three = false;
  let twoPair = false;
  let four = false;
  let five = false;
  let jacks;
  if (handObj["J"]) {
    jacks = handObj["J"];
  }

  for (const key in handObj) {
    if (key === "J") continue;
    let amount = handObj[key];
    if (amount === 1) {
      one = true;
    } else if (amount === 2) {
      if (two) twoPair = true;
      else two = true;
    } else if (amount === 3) {
      three = true;
    } else if (amount === 4) {
      four = true;
    } else {
      five = true;
    }
  }

  if (
    five ||
    (four && jacks === 1) ||
    (three && jacks === 2) ||
    (two && jacks === 3) ||
    (one && jacks === 4) ||
    jacks === 5
  )
    return "a";
  if (
    four ||
    (three && jacks === 1) ||
    (two && jacks === 2) ||
    (one && jacks === 3)
  )
    return "b";
  if ((three && two) || (twoPair && jacks === 1)) return "c";
  if (three || (two && jacks === 1) || (one && jacks === 2)) return "d";
  if (twoPair) return "e";
  if (two || (one && jacks === 1)) return "f";
  return "g";
};

const tallyHand = (hand) => {
  const result = {};

  for (let i = 0; i < hand.length; i++) {
    let card = hand[i];

    if (result[card] === undefined) result[card] = 0;
    result[card]++;
  }
  return nameHand(result);
};

/// CHANGE INPUT HERE
const handsBids = data.map((a) => {
  return [tallyHand(a[0]), a[1], a[0]];
});

//// CHANGE INPUT HERE

const sortHands = (arr) => {
  const map = new Map();

  for (let i = 0; i < arr.length; i++) {
    if (!map.has(arr[i][0])) map.set(arr[i][0], []);
    map.get(arr[i][0]).push(arr[i].slice(1));
  }
  return sortMap(map);
};

const sortMap = (map) => {
  const valuesItr = map.values();
  const keysItr = map.keys();
  let curr = valuesItr.next();
  let key = keysItr.next();
  while (curr.value !== undefined) {
    let value = curr.value;
    console.log(value);
    value.sort((a, b) => recurse(a[1], b[1]));
    console.log(value);
    curr = valuesItr.next();
    key = keysItr.next();
  }
  return map;
};

const recurse = (a, b) => {
  if (!a && !b) return 0;
  let one = cardValues.get(a[0]);
  let two = cardValues.get(b[0]);
  if (one < two) return -1;
  if (one > two) return 1;
  return recurse(a.slice(1), b.slice(1));
};

const pushArray = (map) => {
  const keyItr = map.keys();
  let curr = keyItr.next();
  let result = [];

  while (curr.value !== undefined) {
    console.log(curr);
    result.push(curr);
    curr = keyItr.next();
  }
  console.log(result);
  result = result.sort((a, b) => {
    if (a.value < b.value) {
      return -1; // 'a' comes before 'b'
    }
    if (a.value > b.value) {
      return 1; // 'b' comes before 'a'
    }
    return 0; // the values are equal
  });

  const finalResult = result.map((a) => map.get(a.value));
  return finalResult.flat();
};

console.log(handsBids);
const handsMap = sortHands(handsBids);
const sortedArr = pushArray(handsMap);
console.log(sortedArr);

const tally = (arr) => {
  let length = arr.length;
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
    const bid = arr[i][0];
    sum += bid * (length - i);
  }
  return sum;
};

// console.log(tally(sortedArr));

/*
    after tallying hand we can determine what kind of hand it is 
    then maybe we can add to a map that maps all different kinds of hands to one key, push to an array
    once they are in the array we must sort those in order on how they want 
    after doing that we can add back to one big array in order of hand strength
    then we can figure out the bids



*/
